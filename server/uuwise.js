var httpReq = FW.ClientReq;
Meteor.methods({
    getCheckCode : function() {
        var resp = httpReq.get("http://www.uuwise.com/Common/Captcha.aspx", {});
        if (resp.error || resp.statusCode != 200) {
            console.log(resp.error);
        }
        return resp;
    }
});
