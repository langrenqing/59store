var from = 0;
var schools = null;
var cId = -1;
Template.schoolDorms.helpers({
	schools : function() {
		return schools.reactive();
	}
});

Template.schoolDorms.events({
	"click .mui-action-back" : function(evt) {
		evt.preventDefault();
		Router.go("city", {}, {hash:cId});
	}
});

Template.schoolDorms.onCreated(function(){
	schools = new MysqlSubscription('schoolsByCid',from,this.data.cId);
	cId = this.data.cId;
})
