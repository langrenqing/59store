Meteor.publish('schoolsByCid', function(from,cid){
	cid = parseInt(cid);
	var sql = 'SELECT 59s.site_id AS id, 59s. NAME AS name, count(DISTINCT 59d.dormentry_id) AS dormNum, '
	+ ' count(DISTINCT 59sh.shop_id) AS shopNum '
	+ ' FROM 59_site 59s JOIN 59_dormentry 59d ON 59s.site_id = 59d.site_id '
	+ ' JOIN 59_shop 59sh ON 59sh.dormentry_id = 59d.dormentry_id '
	+ ' WHERE 59s.city_id  = ' + cid 
	+ ' GROUP BY 59s.site_id order by dormNum desc ' ;
	console.log("sql:" + sql);
	return liveDb.select(sql, [ { table: '59_site' } ]);
});
