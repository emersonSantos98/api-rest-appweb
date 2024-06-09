const pagarMeConfig = require('../../../config/pagarMeConfig');
const pagarMerServices = require('../../../domain/Services/PagarMe/PagarMerService');
const axios = require('axios');

function create(body) {
  const url = pagarMeConfig.pagarMeConfig.url + '/orders';

  return pagarMerServices.Post(body, url);
}

module.exports = { create };
