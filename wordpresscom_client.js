Wordpresscom = {};

// Request WordPress.com credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Wordpresscom.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'wordpresscom'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();

  var scope = (options && options.requestPermissions) || ['user:email'];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginStyle = OAuth._loginStyle('wordpresscom', config, options);

  var loginUrl =
    'https://public-api.wordpress.com/oauth2/authorize' +
    '?client_id=' + config.clientId +
    '&redirect_uri=' + OAuth._redirectUri('wordpresscom', config) +
    '&response_type=code' +
    '&scope=auth' +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken, options.redirectUrl);

  OAuth.launchLogin({
    loginService: "wordpresscom",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 900, height: 450}
  });
};
