const pagarMeConfig = require('../../../config/pagarMeConfig');
const pagarMerServices = require('../../../domain/Services/PagarMe/PagarMerService');
const axios = require('axios');

// eslint-disable-next-line require-jsdoc
function create(body, idCustomer) {
  const url =
    pagarMeConfig.pagarMeConfig.url + '/customers/' + idCustomer + '/cards';

  return pagarMerServices.Post(body, url);
}

module.exports = { create };
