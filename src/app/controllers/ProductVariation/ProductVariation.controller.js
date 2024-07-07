// ProductVariation.controller.js
const ProductVariationService = require('../../../../domain/services/ProductVariation/ProductVariation.service');

// Define your controller methods here

class ProductVariationController {
  constructor() {
    this.ProductVariationService = new ProductVariationService();
    this.createProductVariation = this.createProductVariation.bind(this);
    this.findAllProductVariations = this.findAllProductVariations.bind(this);
    this.findOneProductVariation = this.findOneProductVariation.bind(this);
    this.updateProductVariation = this.updateProductVariation.bind(this);
    this.deleteProductVariation = this.deleteProductVariation.bind(this);
  }

  async createProductVariation(request, response) {
    const productvariation = await this.ProductVariationService.createProductVariation(request.body);
    return response.status(201).json(productvariation);
  }
  async findAllProductVariations(request, response) {
    const productvariations = await this.ProductVariationService.findAllProductVariations(request.query);
    response.status(200).json(productvariations);
  }
  async findOneProductVariation(request, response) {
    const { productvariationId } = request.params;
    const productvariation = await this.ProductVariationService.findOneProductVariation(productvariationId);
    return response.status(200).json(productvariation);
  }
  async updateProductVariation(request, response) {
    const { productvariationId } = request.params;
    const productvariation = await this.ProductVariationService.updateProductVariation(productvariationId, request.body);
    return response.status(200).json(productvariation);
  }
  async deleteProductVariation(request, response) {
    const { productvariationId } = request.params;
    const productvariation = await this.ProductVariationService.deleteProductVariation(productvariationId);
    return response.status(200).json(productvariation);
  }
}

module.exports = ProductVariationController;
