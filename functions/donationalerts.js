'use strict';

const axios = require('axios');

exports.handler = async function(event, context, callback) {
  const clientId = process.env.DONATIONALERTS_CLIENTID;
  const clientSecret = process.env.DONATIONALERTS_CLIENTSECRET;
  const code = event.queryStringParameters.code;

  if (!code) {
    callback(null, {
      statusCode: 400,
      body: 'Missing code'
    });
  }

  try {
    const { data } = await axios.post('https://www.donationalerts.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: 'http://sogebot.xyz/integrations/donationalerts/code/',
      code
    });

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: 'Invalid code'
    });
  }
};
