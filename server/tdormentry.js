
Meteor.publish('allDormentries', function(from,schoolId) {
	schoolId = parseInt(schoolId);
	var sql = 'SELECT 59d.dormentry_id AS id, 59d. NAME AS name, count(DISTINCT 59sh.shop_id) AS shopNum '
	+ ' FROM 59_dormentry 59d JOIN 59_shop 59sh ON 59sh.dormentry_id = 59d.dormentry_id '
	+ ' WHERE 59d.site_id = '+ schoolId + ' GROUP BY 59d.dormentry_id ';
	console.log("sql:" + sql);
	return liveDb.select(sql, [ { table: '59_dormentry' } ]);
});
