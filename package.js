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
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Wordpresscom');

  api.addFiles(
    ['wordpresscom_configure.html', 'wordpresscom_configure.js'],
    'client');

  api.addFiles('wordpresscom_server.js', 'server');
  api.addFiles('wordpresscom_client.js', 'client');
});
