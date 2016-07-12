Package.describe({
  name: 'wangxq:log4js',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'git@gitlab.astoyw.com:root/meteor_log4js.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({log4js: "0.6.31"});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('log4js_client.js', 'client');
  api.addFiles('log4js_server.js', 'server');
  api.export('log4js');
  api.export('logger');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('wangxq:log4js');
  api.addFiles('log4js-tests.js');
});
