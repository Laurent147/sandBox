var redirectUri = 'http://localhost:3000/authorize';
var redirectUri2 = 'http://localhost:3000/auth';
const {AuthorizationCode } = require('simple-oauth2');
require('dotenv').config();

var scopes = [
  'openid',
  'profile',
  'offline_access',
  'mail.send'
];

const oauth2 = new AuthorizationCode({
  client: {
    id: process.env.MCLIENT_ID,
    secret: process.env.MCLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com/' + process.env.MTENANT_ID + '/',
    tokenPath: 'oauth2/v2.0/token',
    authorizePath: 'oauth2/v2.0/authorize',
  },
  options: {
    authorizationMethod: 'body',
  },
});

module.exports = {
  getAuthUrl: function() {
    var returnVal = oauth2.authorizeURL({
      redirect_uri: redirectUri,
      scope: scopes.join(' ')
    });
    console.log('');
    console.log('Generated auth url: ' + returnVal);
    return returnVal;
  },

  getTokenFromCode: function(auth_code, res, req, cb) {
    oauth2.getToken({
      code: auth_code,
      redirect_uri: redirectUri,
      scope: scopes.join(' ')
    })
    .then((result) => {
      console.log('Token created: ', result);
      cb(res, req, null, result);
    })
    .catch(err => {
      console.log(err.message);
      cb(res, req, err, null);
    })
  },

  getEmailFromIdToken: function(id_token) {
    // JWT is in three parts, separated by a '.'
    var token_parts = id_token.split('.');

    // Token content is in the second part, in urlsafe base64
    var encoded_token = new Buffer(token_parts[1].replace('-', '+').replace('_', '/'), 'base64');

    var decoded_token = encoded_token.toString();

    var jwt = JSON.parse(decoded_token);

    // Email is in the preferred_username field
    return jwt.preferred_username
  },

  getTokenFromRefreshToken: function(refresh_token, callback, request, response) {
    var token = oauth2.accessToken.create({ refresh_token: refresh_token, expires_in: 0});
    token.refresh(function(error, result) {
      if (error) {
        console.log('Refresh token error: ', error.message);
        callback(request, response, error, null);
      }
      else {
        console.log('New token: ', result.token);
        callback(request, response, null, result);
      }
    });
  }
};
