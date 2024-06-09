const AddressServices = require('../../../../domain/services/Address/AddressServices');
class AddressController {
  constructor() {
    this.addressServices = new AddressServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    const {userId} = req.user
    const {pais, cep, endereco, numero, bairro, complemento, cidade, estado } = req.body;
    const result = await this.addressServices.create(userId, { pais, cep, endereco, numero, bairro, complemento, cidade, estado });
    return res.status(201).json(result);
  }

  async findAll(req, res) {
    const results = await this.addressServices.findAll();
    return res.status(200).json(results);
  }

  async findOne(req, res) {
    const { id } = req.params;
    const result = await this.addressServices.findOne(id);
    return res.status(200).json(result);
  }

  async update(req, res) {
    const {userId} = req.user
    const { body } = req;
    const result = await this.addressServices.update(userId, body);
    return res.status(200).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;
    const result = await this.addressServices.delete(id);
    return res.status(200).json(result);
  }
}

module.exports = AddressController;
