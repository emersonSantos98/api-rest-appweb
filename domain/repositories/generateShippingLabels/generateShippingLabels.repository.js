// generateShippingLabels.repository.js
// Define your repository methods here
const { generateShippingLabels } = require('../../models');
class generateShippingLabelsRepository {
  // Example repository method

  async creategenerateShippingLabels(generateshippinglabels) {
    return await generateShippingLabels.create(generateshippinglabels);
  }
  async findAllgenerateShippingLabelss() {
    return await generateShippingLabels.findAll();
  }
  async findOnegenerateShippingLabels(generateshippinglabelsId) {
    return await generateShippingLabels.findByPk(generateshippinglabelsId);
  }
  async updategenerateShippingLabels(
    generateshippinglabelsId,
    generateshippinglabels,
  ) {
    return await generateShippingLabels.update(generateshippinglabels, {
      where: { id: generateshippinglabelsId },
    });
  }
  async deletegenerateShippingLabels(generateshippinglabelsId) {
    return await generateShippingLabels.destroy({
      where: { id: generateshippinglabelsId },
    });
  }
}

module.exports = generateShippingLabelsRepository;
