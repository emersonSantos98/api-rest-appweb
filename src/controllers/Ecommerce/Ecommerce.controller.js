// scraping.controller.js
const CreateEcommerceService = require('../../services/Ecommerce/create_Ecommerce.service');
const UpdateEcommerceService = require('../../services/Ecommerce/update_Ecommerce.service');
const FindAllEcommerceService = require('../../services/Ecommerce/find_all_Ecommerce.service');
const FindOneEcommerceService = require('../../services/Ecommerce/find_one_Ecommerce.service');
const DeleteEcommerceService = require('../../services/Ecommerce/delete_Ecommerce.service');

class EcommerceController {
  async createEcommerce(req, res) {
    const createEcommerceService = new CreateEcommerceService();
    const ecommerce = await createEcommerceService.execute(req.body);
    return res.status(201).json(ecommerce);
  }

  async updateEcommerce(req, res) {
    const updateEcommerceService = new UpdateEcommerceService();
    const { id } = req.params;
    const ecommerce = await updateEcommerceService.execute(id, req.body);
    return res.status(200).json(ecommerce);
  }

  async findAllEcommerces(req, res) {
    const findAllEcommerceService = new FindAllEcommerceService();
    const ecommerces = await findAllEcommerceService.execute(req.query);
    return res.status(200).json(ecommerces);
  }

  async findOneEcommerce(req, res) {
    const findOneEcommerceService = new FindOneEcommerceService();
    const { id } = req.params;
    const ecommerce = await findOneEcommerceService.execute(id);
    return res.status(200).json(ecommerce);
  }

  async deleteEcommerce(req, res) {
    const deleteEcommerceService = new DeleteEcommerceService();
    const { id } = req.params;
    const ecommerce = await deleteEcommerceService.execute(id);
    return res.status(200).json(ecommerce);
  }
}

module.exports = EcommerceController;
