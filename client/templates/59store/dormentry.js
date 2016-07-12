var from = 0;
var list = null;
var pId = -1;
Template.dormentry.helpers({
	list : function() {
		return list.reactive();
	}
});

Template.dormentry.events({
	"click .mui-action-back" : function(evt) {
		evt.preventDefault();
		Router.go("schoolDorms", {}, {hash:cId});
	}
});

Template.dormentry.onCreated(function(){
	list = new MysqlSubscription('allDormentries',from,this.data.pId);
	pId = this.data.pId;
})
