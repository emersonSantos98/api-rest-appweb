const pagarMeConfig = require('../../../config/pagarMeConfig');
const axios = require('axios');

// eslint-disable-next-line require-jsdoc
async function Post(body, url) {
  const apiKey = pagarMeConfig.pagarMeConfig.apiKey;

  const auth = Buffer.from(`${apiKey}:`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
  };

  const data = JSON.stringify(body);

  try {
    const response = await axios.post(url, data, { headers });
    console.log(response.data, 'response.data');
    return response.data;
  } catch (error) {
    console.error('Erro na solicitação:', error);
    throw error; // Lançar o erro para que possa ser tratado pelas chamadas subsequentes
  }
}

module.exports = { Post };
