// Write your package code here!

var consts = {
  CLIENT_LOGGER_NAME: "client-logger"
};

log4js = (function() {
  var log4js = Npm.require('log4js');
  if (typeof log4js === 'undefined' || log4js == null) {
    throw "fail to load log4js library.";
  }
  return log4js;
})();


if (!log4js) {
  throw "log4js not found";
}


if (Meteor.settings && Meteor.settings.log4js) {
  console.log("log4js setting:", JSON.stringify(Meteor.settings.log4js, null, 2));
  log4js.configure(Meteor.settings.log4js);
}


logger = log4js.getLogger();


(function() {
  var logger;
  var methods = {};

  logger = log4js.getLogger(consts.CLIENT_LOGGER_NAME);

  ['info','debug','warn','error'].forEach(function(method, index) {
    var methodName = 'logger_' + method;
    methods[methodName] = function(message, options) {
      if (typeof logger[method] !== 'function') {
        throw new Meteor.Error("logger", "logger["+method+"] is not a method.");
        return;
      }

      logger[method](message);
    }
  });
  Meteor.methods(methods);
})();

