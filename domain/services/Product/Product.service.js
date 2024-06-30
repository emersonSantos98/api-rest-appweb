// Product.service.js
// Define your service methods here
const ProductRepository = require('../../repositories/Product/Product.repository');
const CalculationService = require('../Calculation/Calculation.service');
const { AppError } = require('../../../src/error/Errors');
const moment = require('moment');
moment.locale('pt-br');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.calculationService = new CalculationService();
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
      if (productData && productData.total_cost) {
        productData.total_cost = parseFloat(productData.total_cost);
      }
      if (productData && productData.profit_margin) {
        productData.profit_margin = parseFloat(productData.profit_margin);
      }
      if (productData && productData.price_sale) {
        productData.price_sale = parseFloat(productData.price_sale);
      }
      if (productData && productData.nominal_profit) {
        productData.nominal_profit = parseFloat(productData.nominal_profit);
      }
      if (productData && productData.working_capital) {
        productData.working_capital = parseFloat(productData.working_capital);
      }

      const result = await this.productRepository.createProduct(productData);

      await this.calculationService.createCalculation({
        id_user: product.id_user,
        id_product: result.id,
        price_sale: product.price_sale,
        nominal_profit: product.nominal_profit,
        working_capital: product.working_capital,
        date_calculo: moment().format('YYYY-MM-DD'),
      });
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
