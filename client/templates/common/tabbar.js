Template.tabbar.events({
    "tap #nav2" : function () {
        Router.go("shopCompare");
    },
    "tap #nav1" : function () {
        Router.go("city");
    },
    "tap #nav3" : function () {
        Router.go("checkCode");
    }
});
