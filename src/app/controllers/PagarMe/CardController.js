const PagarMeSubscribers = require('../../Subscribers/PagarMeSubscribers');

class CustomerController {
  constructor() {
    this.create = this.create.bind(this);
  }
  async create(request, response) {
    const body = request.body;
    const idCustomer = 'cus_E6Lvgo9CYmh8pvAj';

    const result = await PagarMeSubscribers.createCard(body, idCustomer);

    return response.status(202).json(result);
  }
}

module.exports = CustomerController;
