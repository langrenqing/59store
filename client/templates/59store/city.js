var from = 0;
var allCites = new MysqlSubscription('allCities',from);
var cityList = {};

Template.city.helpers({
	cites : function() {
		console.log("get cites");
		return allCites.reactive();
	}
});

Template.city.events({
	"tap a" : function(evt) {
		evt.preventDefault();
		Router.go($(evt.target).attr("href"));
	}
});

Template.city.onCreated(function(){
	from = 0;
});

Template.city.onRendered(function(){
	console.log("init end");
	// mui.init({
	// 	pullRefresh : {
	// 	    container: "#cityListCon",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	// 		down: {
	// 			callback: down
	// 		},
	// 	    up : {
	// 	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	// 	      contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	// 	      callback : up //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	// 	    }
	// 	}
	// });
	mui.init();
	mui.ready(function() {
		var header = document.querySelector('.mui-bar');
		var list = document.getElementById('list');
		//calc hieght
		list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
		//create
		console.log("body height:" + document.body.offsetHeight + ", height:" + header.offsetHeight)
		window.indexedList = new mui.IndexedList(list);
	});
})

function loadCity(num) {
	from = from + num;
	allCites.change(from);
	allCites.changed();
}

function down() {
	console.log("pull down load");
	if(from > 0) {
		loadCity(-1);
	}
	mui('#cityListCon').pullRefresh().endPulldownToRefresh();
}

function up() {
	console.log("pull up load");
	loadCity(1);
	mui('#cityListCon').pullRefresh().endPullupToRefresh(false);
}
