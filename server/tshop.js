
Meteor.publish('allShopes', function(from,dormentryId) {
	dormentryId = parseInt(dormentryId);
	var sql = 'SELECT 59sh.shop_id AS id, 59sh. NAME AS name, dorm_name,item_num,shop_type,shop_address  '
	+ ' FROM 59_shop 59sh  '
	+ ' WHERE 59sh.dormentry_id = ' + dormentryId + ' GROUP BY 59sh.shop_id ';
	console.log("allShopes sql:" + sql);
	return liveDb.select(sql, [ { table: '59_shop' } ]);
});
