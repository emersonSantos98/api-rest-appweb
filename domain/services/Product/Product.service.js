// Product.service.js
// Define your service methods here
const ProductRepository = require('../../repositories/Product/Product.repository');
const { AppError } = require('../../../src/error/Errors');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(product, image) {
    try {
      let imageData = null;
      if (image) {
        imageData = image.buffer;
      }
      const productData = {
        ...product,
        image: imageData,
      };

      const result = await this.productRepository.createProduct(productData);
      return {
        message: 'Product created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findAllProducts() {
    try {
      const result = await this.productRepository.findAllProducts();
      return {
        message: 'Products found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findOneProduct(productId) {
    try {
      const result = await this.productRepository.findOneProduct(productId);
      return {
        message: 'Product found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async updateProduct(productId, product) {
    try {
      const result = await this.productRepository.updateProduct(
        productId,
        product,
      );
      return {
        message: 'Product updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async deleteProduct(productId) {
    try {
      const result = await this.productRepository.deleteProduct(productId);
      return {
        message: 'Product deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = ProductService;
