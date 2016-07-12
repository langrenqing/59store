Package.describe({
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

 Npm.depends({
  "iconv-lite": '0.4.11'
 });

Package.onUse(function(api){
    api.addFiles(['httpReq.js'], ['server']);
    api.export(['FW'], 'server');
});
