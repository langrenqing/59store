
logger = (function(){
  var api = {};
  ['info','debug','warn','error'].forEach(function(method, index) {
    api[method] = function(message, options) {
      Meteor.call('logger_' + method, message);
    }
  });
  return api;
})();

