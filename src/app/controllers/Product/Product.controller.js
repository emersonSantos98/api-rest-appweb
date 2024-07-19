// Product.controller.js
const ProductService = require('../../../../domain/services/Product/Product.service');
const LabelService = require('../../../../domain/services/LabelService');
// Define your controller methods here

class ProductController {
  constructor() {
    this.ProductService = new ProductService();
    this.labelService = new LabelService();
    this.createProduct = this.createProduct.bind(this);
    this.findAllProducts = this.findAllProducts.bind(this);
    this.findOneProduct = this.findOneProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getStock = this.getStock.bind(this);
    this.generateLabel = this.generateLabel.bind(this);
  }

  async createProduct(request, response) {
    request.body.id_user = request.user.userId;
    const product = await this.ProductService.createProduct(
      request.body,
      request.file,
    );
    return response.status(201).json(product);
  }
  async findAllProducts(request, response) {
    const products = await this.ProductService.findAllProducts(request.query);
    response.status(200).json(products);
  }
  async findOneProduct(request, response) {
    const { productId } = request.params;
    const product = await this.ProductService.findOneProduct(productId);
    return response.status(200).json(product);
  }
  async updateProduct(request, response) {
    const { productId } = request.params;
    const product = await this.ProductService.updateProduct(
      productId,
      request.body,
    );
    return response.status(200).json(product);
  }
  async deleteProduct(request, response) {
    const { productId } = request.params;
    const product = await this.ProductService.deleteProduct(productId);
    return response.status(200).json(product);
  }

  async getStock(request, response) {
    const { productVariationId } = request.params;
    const stock = await this.ProductService.getStock(productVariationId);
    return response.status(200).json(stock);
  }

  async generateLabel(request, response) {
    const { productId } = request.params;
    const labelPath = await this.labelService.generateLabel(
      productId,
      request.query.labelCountPerVariation,
    );
    return response.download(labelPath);
  }
}

module.exports = ProductController;
