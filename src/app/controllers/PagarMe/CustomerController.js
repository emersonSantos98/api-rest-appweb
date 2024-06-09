const PagarMeSubscribers = require('../../Subscribers/PagarMeSubscribers');

class CustomerController {
  constructor() {
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    const body = request.body;

    const result = await PagarMeSubscribers.createCustomer(body);
    return response.status(202).json(result);
  }
}

module.exports = CustomerController;
