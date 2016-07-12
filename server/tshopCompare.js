
Meteor.publish('shopCompareList', function(dormentryId) {
	var sql = 'SELECT DISTINCT 59sh.shop_id AS id, 59sh. NAME AS name, dorm_name,item_num,shop_type,shop_address  '
	+ ' FROM 59_shop 59sh  '
	+ ' WHERE 59sh.shop_id in (' + dormentryId + ') ';
	console.log("allShopes sql:" + sql);
	return liveDb.select(sql, [ { table: '59_shop' } ]);
});

Meteor.publish('shopCompare', function(id1, id2) {
	var sql = 'SELECT *, count(1) AS num FROM ( SELECT DISTINCT 59il.rid, 59il.price, 59il.shop_id,'
	+ ' 59il. NAME as name, "L" AS tag FROM 59_item 59il WHERE shop_id = ' + id1 +'  '
	+ ' UNION SELECT DISTINCT 59il.rid, 59il.price, 59il.shop_id, '
	+ ' 59il. NAME as name, "R" AS tag FROM 59_item 59il WHERE shop_id =  ' + id2 +' ) '
	+ ' AS 59i GROUP BY rid ORDER BY num desc, tag';
	console.log("shopCompare sql:" + sql);
	return liveDb.select(sql, [ { table: '59_item' } ]);
})
