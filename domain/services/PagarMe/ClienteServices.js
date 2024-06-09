const pagarMeConfig = require('../../../config/pagarMeConfig');
const pagarMerServices = require('../../../domain/Services/PagarMe/PagarMerService');

function create(body) {
  const url = pagarMeConfig.pagarMeConfig.url + '/customers';

  return pagarMerServices.Post(body, url);
}

module.exports = { create };
