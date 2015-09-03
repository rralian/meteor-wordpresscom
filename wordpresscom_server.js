Wordpresscom = {};

OAuth.registerService('wordpresscom', 2, null, function(query) {

  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  return {
    serviceData: {
      id: identity.ID,
      accessToken: OAuth.sealSecret(accessToken),
      email: identity.email,
      username: identity.username,
      displayName: identity.display_name,
      avatar: identity.avatar_URL
    },
    options: {profile: {
        name: identity.display_name,
        displayName: identity.display_name,
        avatar: identity.avatar_URL
    }}
  };
});

var userAgent = "Meteor";
if (Meteor.release)
  userAgent += "/" + Meteor.release;

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'wordpresscom'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    response = HTTP.post(
      "https://public-api.wordpress.com/oauth2/token", {
        headers: {
          Accept: 'application/json',
          "User-Agent": userAgent
        },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: OAuth.openSecret(config.secret),
          redirect_uri: OAuth._redirectUri('wordpresscom', config),
          grant_type: 'authorization_code',
          state: query.state
        }
      });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with WordPress.com. " + err.message),
                   {response: err.response});
  }
  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with WordPress.com. " + response.data.error);
  } else {
    return response.data.access_token;
  }
};

var getIdentity = function (accessToken) {
  try {
    return HTTP.get(
      "https://public-api.wordpress.com/rest/v1.1/me", {
        headers: {
            "User-Agent": userAgent,
            "Authorization": 'Bearer ' + accessToken
        },
        params: {access_token: accessToken}
      }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from WordPress.com. " + err.message),
                   {response: err.response});
  }
};

Wordpresscom.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
