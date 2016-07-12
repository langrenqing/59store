var from = 0;
var list = null;
var pId = -1;
Template.item.helpers({
	list : function() {
		return list.reactive();
	}
});

Template.item.events({
	"click .mui-action-back" : function(evt) {
		evt.preventDefault();
		Router.go("shop", {}, {hash:cId});
	}
});

Template.item.onCreated(function(){
	list = new MysqlSubscription('allItems',from,this.data.pId);
	pId = this.data.pId;
})
