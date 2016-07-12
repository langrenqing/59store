var from = 0;
var list = null;
var pId = -1;
Template.shop.helpers({
	list : function() {
		return list.reactive();
	}
});

Template.shop.events({
	"click .mui-action-back" : function(evt) {
		evt.preventDefault();
		Router.go("dormentry", {}, {hash:cId});
	},
	"tap #toCompare" : function(evt) {
		evt.preventDefault();
		console.log(this.id);
		var compareList = Session.get("compareList") ? Session.get("compareList").split(",")  :  [];
		if(!_.contains(compareList , this.id)) {
			compareList.push(this.id);
			Session.set("compareList",  compareList.join(","));
		}
	}
});

Template.shop.onCreated(function(){
	list = new MysqlSubscription('allShopes',from,this.data.pId);
	pId = this.data.pId;
});
