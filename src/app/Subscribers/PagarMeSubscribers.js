const customerServices = require('../../../domain/Services/PagarMe/ClienteServices');
const cardServices = require('../../../domain/Services/PagarMe/CardServices');
const checkoutServices = require('../../../domain/Services/PagarMe/CheckoutServices');
const pixServices = require('../../../domain/Services/PagarMe/PixServices');

const customerGooldServices = require('../../../domain/services/Goold/CustomerGooldServices');

async function createCustomer(body) {
  return await customerServices.create(body);
}
async function createCard(body, idCustomer) {
  return await cardServices.create(body, idCustomer);
}

async function createCheckout(body) {
  // Extract cliente object
  const cliente = {
    type: body.customer.type,
    name: body.customer.name,
    email: body.customer.email,
    document_type: 'CPF', // Assuming it's always CPF
    document: body.customer.document,
    gender: 'male', // You can set the appropriate gender
    phones: body.customer.phones,
    address: {
      line_1: body.customer.address.line_1,
      line_2: body.customer.address.line_2, // Convert to lowercase
      zip_code: body.customer.address.zip_code,
      city: body.customer.address.city,
      state: body.customer.address.state,
      country: body.customer.address.country,
    },
    code: body.items[0].code, // Assuming you want the code from the first item
    birthdate: '07/11/2003', // Set the birthdate as needed
    metadata: {
      company: 'Lannister', // Set the appropriate company
    },
  };

  const clienteResponse = await customerServices.create(cliente);
  const idCustomer = clienteResponse.id;

  const customerId = idCustomer;
  const json = JSON.stringify(cliente);

  const data = { customerId, json };

  console.log(customerId, 'customerId ===========>');
  console.log(data, 'datajson ===========>');

  const ret = customerGooldServices.create(data);
  console.log(ret, 'ret ===========>');

  const card = {
    number: body.number, // You need to generate a valid card number
    holder_name: body.cardName,
    holder_document: null,
    exp_month: body.exp_month,
    exp_year: body.exp_year,
    cvv: body.cvv, // Taking CVV from payments
    brand: 'Mastercard', // Set the appropriate brand
    label: 'cliqx', // Set the appropriate label
    billing_address: {
      line_1: body.payments[0].credit_card.card.billing_address.line_1,
      line_2: body.payments[0].credit_card.card.billing_address.line_2, // Convert to lowercase
      zip_code: body.payments[0].credit_card.card.billing_address.zip_code,
      city: body.payments[0].credit_card.card.billing_address.city,
      state: body.payments[0].credit_card.card.billing_address.state,
      country: body.payments[0].credit_card.card.billing_address.country,
    },
    metadata: {
      Classificação: 'Cliente VIP', // Set the appropriate classification
    },
  };

  const cardReponse = await cardServices.create(card, idCustomer);
  const idCard = cardReponse.id;

  const mappedObject = {
    closed: body.closed,
    customer: {
      name: body.customer.name,
      type: body.customer.type,
      email: body.customer.email,
      document: body.customer.document,
      address: {
        line_1: body.customer.address.line_1,
        line_2: body.customer.address.line_2,
        zip_code: body.customer.address.zip_code,
        city: body.customer.address.city,
        state: body.customer.address.state,
        country: body.customer.address.country,
      },
      phones: {
        home_phone: {
          country_code: body.customer.phones.home_phone.country_code,
          area_code: body.customer.phones.home_phone.area_code,
          number: body.customer.phones.home_phone.number,
        },
        mobile_phone: {
          country_code: body.customer.phones.mobile_phone.country_code,
          area_code: body.customer.phones.mobile_phone.area_code,
          number: body.customer.phones.mobile_phone.number,
        },
      },
    },
    items: body.items.map(item => ({
      amount: item.amount,
      description: item.description,
      quantity: item.quantity,
      code: item.code,
    })),
    payments: body.payments.map(payment => ({
      payment_method: 'credit_card',
      credit_card: {
        installments: payment.credit_card.installments,
        statement_descriptor: payment.credit_card.statement_descriptor,
        card_id: idCard,
        card: {
          cvv: payment.credit_card.card.cvv,
          billing_address: {
            line_1: payment.credit_card.card.billing_address
              ? payment.credit_card.card.billing_address.line_1
              : '',
            zip_code: payment.credit_card.card.billing_address.zip_code,
            city: payment.credit_card.card.billing_address.city,
            state: payment.credit_card.card.billing_address.state,
            country: payment.credit_card.card.billing_address.country,
          },
        },
      },
    })),
  };

  const checkoutResponse = await checkoutServices.create(mappedObject);

  return checkoutResponse;
}

async function createPix(body) {
  console.log(body, 'body');
  const pixRequest = {
    items: body.items.map(item => ({
      amount: item.amount,
      description: item.description,
      quantity: item.quantity,
    })),
    customer: {
      name: body.customer.name,
      email: body.customer.email,
      type: body.customer.type,
      document: body.customer.document,
      phones: {
        home_phone: {
          country_code: body.customer.phones.home_phone.country_code,
          number: body.customer.phones.home_phone.number,
          area_code: body.customer.phones.home_phone.area_code,
        },
      },
    },
    payments: body.payments.map(payment => ({
      payment_method: 'pix',
      pix: {
        expires_in: payment.pix.expires_in,
        additional_information: [
          {
            name: 'Quantidade',
            value: '1',
          },
        ],
      },
    })),
  };

  const checkoutResponse = await pixServices.create(pixRequest);

  return checkoutResponse;
}

module.exports = { createCustomer, createCard, createCheckout, createPix };
