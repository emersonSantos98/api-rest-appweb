const GenerateShippingLabelsService = require('../../../../domain/services/generateShippingLabels/generateShippingLabels.service');
const { AppError } = require('../../../error/Errors');
const fs = require('fs');
class generateShippingLabelsController {
  constructor() {
    this.generateShippingLabelsService = new GenerateShippingLabelsService();
    this.creategenerateShippingLabels =
      this.creategenerateShippingLabels.bind(this);
  }

  async creategenerateShippingLabels(request, response) {
    try {
      const outputFilePath = await this.generateShippingLabelsService.creategenerateShippingLabels(request.file);
      return response.download(outputFilePath);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}

module.exports = generateShippingLabelsController;
