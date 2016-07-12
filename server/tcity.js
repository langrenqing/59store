
Meteor.publish('allCities', function(from) {
	console.log("from=",from);
	var sql = 'SELECT 59c.city_id AS id, 59c.city AS name, 59c.spell_all, count(DISTINCT 59s.site_id) AS schoolNum,  '
	+  ' count(DISTINCT 59d.dormentry_id) AS dormentryNum, count(DISTINCT 59sh.shop_id) AS shopNum '
	+  ' FROM 59_city 59c JOIN 59_site 59s ON 59c.city_id = 59s.city_id '
	+ ' JOIN 59_dormentry 59d ON 59s.site_id = 59d.site_id '
	+ ' JOIN 59_shop 59sh ON 59sh.dormentry_id = 59d.dormentry_id GROUP BY 59c.city_id'
	+ ' ORDER BY 59c.spell_all asc ';
	//console.log("sql:" + sql);
	return liveDb.select(sql, [ { table: 't_city' } ]);
});
