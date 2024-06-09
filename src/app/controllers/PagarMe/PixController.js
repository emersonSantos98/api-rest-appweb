const PagarMeSubscribers = require('../../Subscribers/PagarMeSubscribers');

class PixController {
  constructor() {
    this.create = this.create.bind(this);
  }
  async create(request, response) {
    const body = request.body;

    const result = await PagarMeSubscribers.createPix(body);

    return response.status(202).json(result);
  }
}

module.exports = PixController;
