Meteor.publish('allItems', function(from,shopId) {
	shopId = parseInt(shopId);
	var sql = 'SELECT DISTINCT rid, name, cate_id, price FROM 59_item 59i WHERE shop_id = ' + shopId + ' ORDER BY cate_id ';
    console.log("sql:" + sql);
	return liveDb.select(sql, [ { table: '59_item' } ]);
});
