const axios = require('axios');

exports.handler = (event, context, callback) => {
  const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token';
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const CODE = event.queryStringParameters.code;
  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: CODE
  };
  const opts = { headers: { accept: 'application/json' } };
  axios.post(GITHUB_AUTH_ACCESSTOKEN_URL, body, opts)
    .then(res => {
      return res.data['access_token'];
    })
    .then(token => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(token),
      });
    })
    .catch(err => {
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      })
    })
  });
}
