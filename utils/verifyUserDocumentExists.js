const { Customer } = require('../domain/models');

async function findByDocument(document) {
  const customer = await Customer.findOne({ where: { document } });
  return !!customer;
}

module.exports = { findByDocument };
