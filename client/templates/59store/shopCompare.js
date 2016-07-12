var from = 0;
var list = null;
var shops = null;
Template.shopCompare.helpers({
	list : function() {
		if(list != null)
		return list.reactive();
	},
	items : function() {
		// Tracker.autorun(function() {
		if(shops != null)
			return shops.reactive();
		// });
	},
	isBoth : function(num, tag) {
		return num == 2;
	},
	isLeft : function(num, tag) {
		return num == 1 && tag == 'L';
	},
	isRight : function(num, tag) {
		return num == 1 && tag == 'R';
	},
});

Template.shopCompare.events({
	"click .mui-action-back" : function(evt) {
		evt.preventDefault();
		Router.go("dormentry", {}, {hash:cId});
	},
	"tap #compareBtn" : function(evt) {
		evt.preventDefault();
		reactItem();
	},
	"tap #clearBtn" : function(evt) {
		Session.set("compareList", "");
		list.change("-1");
		list.changed();
	},
	"tap .shop_delete" : function(evt) {
		evt.preventDefault();
		var compareList = Session.get("compareList") ? Session.get("compareList").split(",")  :  [];
		if(!_.contains(compareList , this.id)) {
			var _temp = _.difference(compareList, ["" + this.id]);
			if(_temp.length == 0) {
					Session.set("compareList",  "-1");
			} else {
				Session.set("compareList",  _temp.join(","));
			}
			list.change(_temp.join(","));
			list.changed();
			reactItem(true);
		}
	}
});
function reactItem(showTip) {
	var chk_value =[];
	$('.shop_chx:checked').each(function(){
		chk_value.push($(this).attr("id"));
	});
	console.log(chk_value);
	if(!showTip && chk_value.length != 2) {
		mui.alert("请选择两个商铺", "提示");
		return false;
	} else if(showTip) {
		chk_value = [-1,-1];
	}
	//shopCompare
	shops.change(chk_value[0], chk_value[1]);
	shops.changed();
}
Template.shopCompare.onCreated(function(){
	var compareList = Session.get("compareList");
	console.log(compareList);
	if(compareList != null && compareList.length > 0) {
		list = new MysqlSubscription('shopCompareList', compareList);
	}
	shops = new MysqlSubscription('shopCompare', -1, -2);
});
