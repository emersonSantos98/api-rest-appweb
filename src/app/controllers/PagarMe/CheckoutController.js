const PagarMeSubscribers = require('../../Subscribers/PagarMeSubscribers');

class CheckoutController {
  constructor() {
    this.create = this.create.bind(this);
  }
  async create(request, response) {
    const body = request.body;

    const result = await PagarMeSubscribers.createCheckout(body);

    return response.status(202).json(result);
  }
}

module.exports = CheckoutController;
