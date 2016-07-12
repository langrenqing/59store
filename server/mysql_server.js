liveDb = new LiveMysql(Meteor.settings.mysql);
var closeAndExit = function() {
	liveDb.end();
	process.exit();
};
// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);

PAGE_SIZE = 10;

function getFrom(from) {
	if(!from) {
		from = 0;
	}
	var fromIndex = parseInt(from);
	fromIndex = fromIndex < 0 ? 0 : fromIndex;
	return fromIndex;
}

limit = function(from, pageSize) {
	var _ps = pageSize || PAGE_SIZE
	return " limit " + getFrom(from) * _ps + "," + _ps;
}
