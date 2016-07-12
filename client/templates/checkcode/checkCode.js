var from = 0;
var list = null;
var shops = null;
Template.checkCode.helpers({
	checkCodeContent : function() {
		console.log("img changed.")
		return Session.get("checkCodeContent");
	}
});

Template.checkCode.events({
	"click .mui-action-back" : function(evt) {
		evt.preventDefault();
		Router.go("dormentry", {}, {hash:cId});
	},
	"tap #getCheckCodeBtn" : function(evt) {
		evt.preventDefault();
		getCheckCode();
	}
});

function getCheckCode() {
	Meteor.call("getCheckCode", function(err, result) {
		if (result.error || result.statusCode != 200) {
			console.log(result.error);
		} else {
			Session.set("checkCodeContent", result.content);
		}
	});
}

Template.checkCode.onCreated(function(){

});

Template.checkCode.onRendered(function() {
	$('#checkCodeVal').bind('keyup', function(event) {
        if (event.keyCode == "13") {
			console.log("enter is clicked.");
			if($(this).val() &&$(this).val().length > 0) {
				//send the code to backend.
				$(this).val("");
			}
			getCheckCode();
        }
    });
});
