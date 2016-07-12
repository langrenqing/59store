Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: '59Layout',

});

if (Meteor.isClient) {

}

Router.route('city',
    {
        path : "/",
        data:{ title : '城市列表'}
});

Router.route('schoolDorms',
    function() {
        this.render("schoolDorms", {
            data : function() {
                return {cId : this.params.id}
            }
        })
    },
    {
        path  : "schoolDorms/:id",
        name : "schoolDorms",
        data:{ title : '学校列表'}
    }
);

Router.route('dormentry',
    function() {
        this.render("dormentry", {
            data : function() {
                return {pId : this.params.id}
            }
        })
    },
    {
        path  : "dormentry/:id",
        name : "dormentry",
        data:{ title : '楼栋列表'}
    }
);

Router.route('shop',
    function() {
        this.render("shop", {
            data : function() {
                return {pId : this.params.id}
            }
        })
    },
    {
        path  : "shop/:id",
        name : "shop",
        data:{ title : '店铺列表'}
    }
);

Router.route('item',
    function() {
        this.render("item", {
            data : function() {
                return {pId : this.params.id}
            }
        })
    },
    {
        path  : "item/:id",
        name : "item",
        data:{ title : '商品列表'}
    }
);

Router.route('shopCompare',
    {
        path : "/shopCompare",
        data:{ title : '商铺对比'}
});

Router.route('checkCode',
    {
        path : "/checkCode",
        data:{ title : '打码平台'}
});
