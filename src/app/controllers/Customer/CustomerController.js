const CustomerService = require('../../../../domain/services/Customer/CustomerServices');

class CustomerController {
  constructor() {
    this.customerServices = new CustomerService();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const {
      user_id,
      name,
      cellphone,
      document,
      popup_notification,
      birth_date,
    } = request.body;
    const customer = await this.customerServices.create({
      user_id,
      name,
      cellphone,
      document,
      popup_notification,
      birth_date,
    });
    return response.status(201).json(customer);
  }

  async findAll(request, response) {
    const customers = await this.customerServices.findAll();
    return response.status(200).json(customers);
  }

  async findOne(request, response) {
    const { id } = request.params;

    const customer = await this.customerServices.findOne(id);
    return response.status(200).json(customer);
  }

  async update(request, response) {
    const { userId } = request.user;

    const { name, cellphone, document } = request.body;

    const customer = await this.customerServices.update(userId, {
      name,
      cellphone,
      document,
    });
    return response.status(200).json(customer);
  }

  async delete(request, response) {
    const { id } = request.params;
    const customer = await this.customerServices.delete(id);
    return response.status(200).json(customer);
  }
}

module.exports = CustomerController;
