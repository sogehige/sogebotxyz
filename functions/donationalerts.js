'use strict';

const axios = require('axios');

exports.handler = async function(event, context, callback) {
  const clientId = process.env.DONATIONALERTS_CLIENTID;
  const clientSecret = process.env.DONATIONALERTS_CLIENTSECRET;
  const code = event.queryStringParameters.code;

  if (event.httpMethod === 'GET') {
    if (!code) {
      console.log('Error: missing code')
      callback(null, {
        statusCode: 400,
        body: 'Missing code'
      });
    }

    try {
      console.log('Code generation started.');
      const { data } = await axios.post('https://www.donationalerts.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: 'http://sogebot.xyz/integrations/donationalerts/code/',
        code
      });
      console.log('Code sent OK')
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      });
    } catch (e) {


      console.log('Invalid code')
      callback(null, {
        statusCode: 400,
        body: 'Invalid code'
      });
    }
  } else {
    // POST
    const refreshToken = JSON.parse(event.body).refreshToken;
    console.log('Refreshing of token started.');

    if (!refreshToken) {
      console.log('Error: missing refresh token')
      callback(null, {
        statusCode: 400,
        body: 'Missing refreshToken'
      });
    }

    try {
      const { data } = await axios.post('https://www.donationalerts.com/oauth/token', {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        scope: 'oauth-user-show oauth-donation-subscribe oauth-donation-index',
      });
      console.log('New tokens sent OK');
      callback(null, {
        body: JSON.stringify(data),
        statusCode: 200,
      });
    } catch (e) {
      console.log(e.stack);
      console.log({event})
      callback(null, {
        statusCode: 500,
      });
    }

  }
};
