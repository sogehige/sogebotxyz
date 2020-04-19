'use strict';

const axios = require('axios');

exports.handler = async function(event, context, callback) {
  const clientId = process.env.STREAMLABS_CLIENTID;
  const clientSecret = process.env.STREAMLABS_CLIENTSECRET;
  const code = event.queryStringParameters.code;

  if (!code) {
    callback(null, {
      statusCode: 400,
      body: 'Missing code'
    });
  }

  try {
    const result = await axios({
      method: 'post',
      url: 'https://streamlabs.com/api/v1.0/token',
      data: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: 'http://sogebot.xyz/integrations/streamlabs/code/',
        code: code
      }
    });

    // per https://dev.streamlabs.com/docs/oauth-2 access_tokens don't expire
    // so we will trust them and we don't care about refresh_token

    callback(null, {
      statusCode: 200,
      body: result.data.access_token
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: 'Invalid code'
    });
  }
};
