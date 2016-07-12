var iconv = Npm.require("iconv-lite");
var regex = /Error: failed \[(\d{1,3})\] .*/ig
HttpReq =  {
	get : function(url, headers , data , cookies, callback) {
		this._call("get", url, headers , data , cookies, callback);
	},
	post : function(url, headers , data , cookies, callback) {
		this._call("post", url, headers , data , cookies, callback);
	},
	_call : function(method, url, headers , data , cookies, callback) {
		var _url = url.replace("https:\/\/","http:\/\/");
		//console.log("http invoke start:" + _url);
		if(headers) {
			headers['cookie'] = headers['cookie'] || "";
			var cookie = headers['cookie'];
			for(var c in cookies) {
				cookie = cookie + ";" + cookies[c];
			}
			headers['cookie'] = cookie;
		}
		// console.log("proxy url :" + this.proxyUrl);
		try {
			var result = HTTP.call(method,_url,{
				npmRequestOptions: {
					//proxy : this.proxyUrl,
					encoding : null
				},
				headers : headers,
				data : data
			});
			callback && callback('' , result.statusCode, result.headers, iconv.decode(result.content, "gbk"));
		} catch(e) {
			if(e.stack) {
				var stack = e.stack.split("\n")[0];
				var msgs = regex.exec(stack);
				if(msgs && msgs.length > 1) {
					throw new Meteor.Error(msgs[1],"服务端出错",stack);
				} else {
					throw new Meteor.Error(500,"服务端出错",stack);
				}
			}
			throw new Meteor.Error(500,"服务端出错","服务端异常");
		}
    }
}

ClientReq = {
	get : function(url, options) {
		return this._call("get", url, options);
	},
	post : function(url, options) {
		return this._call("post", url, options);
	},
	_call : function(method, url, options) {
		var _url = url.replace("https:\/\/","http:\/\/");
		//console.log("http invoke start:" + _url);
		options = options || {};
		var headers = options.headers || {};
		if(options.headers && options.headers.cookie) {
			headers['cookie'] = options.headers.cookie;
		}
		headers['referer'] = this.referer;
		// console.log("proxy url :" + this.proxyUrl);
		try {
			var result = HTTP.call(method,_url,{
				npmRequestOptions: {
					//proxy : this.proxyUrl,
					encoding : null
				},
				headers : headers
			});
			console.log("header" + JSON.stringify(result.headers));
			if(result.headers && result.headers["content-type"].indexOf("image") == 0) {
				//console.log(result.content);
				var buffer = result.content;
				if(buffer instanceof Buffer) {
					result.content = buffer.toString("base64");
				}
			} else {
				result.content = iconv.decode(result.content, "utf-8");
			}
			//console.log("response headers:" + EJSON.stringify(result.headers) );
			result.cookies = this.getCookies(result.headers);
			return result;
		} catch(e) {
			if(e.stack) {
				var stack = e.stack.split("\n")[0];
				var msgs = regex.exec(stack);
				if(msgs && msgs.length > 1) {
					return {error: new Meteor.Error(msgs[1],"服务端出错",stack), statusCode : msgs[1]};
				} else {
					return {error: new Meteor.Error(500,"服务端出错",stack), statusCode : 500};
				}
			}
			return {error: new Meteor.Error(500,"服务端出错","服务端异常"), statusCode : 500};
		}
    },
	setReferer : function(url) {
		this.referer = url;
	},
	getCookies : function(headers) {
		var cookies = "";
		if(headers["set-cookie"]) {
			for(var c in  headers["set-cookie"]) {
				cookies = cookies + c + ";"
			}
		}
		return cookies;
	}
}

FW = {};
FW.HttpReq = HttpReq;
FW.ClientReq = ClientReq;
