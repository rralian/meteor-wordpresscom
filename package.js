Package.describe({
  name: 'rralian:wordpresscom',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'WordPress.com OAuth2 Flow',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rralian/meteor-wordpresscom',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  author: 'Bob Ralian'
});

Package.onUse(function(api) {
  api.use('oauth2@1.1.3', ['client', 'server']);
  api.use('oauth@1.1.4', ['client', 'server']);
  api.use('http@1.1.0', ['server']);
  api.use('underscore@1.0.3', 'client');
  api.use('templating@1.1.1', 'client');
  api.use('random@1.0.3', 'client');
  api.use('service-configuration@1.0.4', ['client', 'server']);

  api.export('Wordpresscom');

  api.addFiles(
    ['wordpresscom_configure.html', 'wordpresscom_configure.js'],
    'client');

  api.addFiles('wordpresscom_server.js', 'server');
  api.addFiles('wordpresscom_client.js', 'client');
});
