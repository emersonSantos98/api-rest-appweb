// Product.service.js
const ProductRepository = require('../../repositories/Product/Product.repository');
const CalculationService = require('../Calculation/Calculation.service');
const ProductVariationService = require('../ProductVariation/ProductVariation.service');
const { AppError } = require('../../../src/error/Errors');
const moment = require('moment');
moment.locale('pt-br');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.calculationService = new CalculationService();
    this.productVariationService = new ProductVariationService();
  }

  _parseProductData({ product, image }) {
    let imageData = null;
    if (image) {
      imageData = image.buffer;
    }

    return {
      ...product,
      image: imageData,
      total_cost: product.total_cost
        ? parseFloat(product.total_cost)
        : undefined,
      profit_margin: product.profit_margin
        ? parseFloat(product.profit_margin)
        : undefined,
      price_sale: product.price_sale
        ? parseFloat(product.price_sale)
        : undefined,
      nominal_profit: product.nominal_profit
        ? parseFloat(product.nominal_profit)
        : undefined,
      working_capital: product.working_capital
        ? parseFloat(product.working_capital)
        : undefined,
    };
  }

  async createProduct(product, image) {
    const productData = this._parseProductData({ product, image });
    try {
      const result = await this.productRepository.createProduct({
        id_user: productData.id_user,
        name_product: productData.name_product,
        description: productData.description,
        profit_margin: productData.profit_margin,
        total_cost: productData.total_cost,
        image: productData.image,
      });

      await this._createCalculationIfNeeded(productData, result.id);

      if (product.variations && product.variations.length > 0) {
        await this.productVariationService.createVariations(
          result.id,
          JSON.parse(product.variations),
        );
      }

      return {
        message: 'Product created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async _createCalculationIfNeeded(productData, productId) {
    if (
      productData.price_sale !== undefined &&
      productData.nominal_profit !== undefined &&
      productData.working_capital !== undefined
    ) {
      await this.calculationService.createCalculation({
        id_user: productData.id_user,
        id_product: productId,
        price_sale: productData.price_sale,
        nominal_profit: productData.nominal_profit,
        working_capital: productData.working_capital,
        date_calculo: moment().format('YYYY-MM-DD'),
      });
    }
  }

  async findAllProducts() {
    try {
      const result = await this.productRepository.findAllProducts();
      result.forEach(product => {
        let generalStock = 0;
        product.variations.forEach(variation => {
          generalStock += variation.stock;
        });
        product.dataValues.created_at = moment(
          product.dataValues.created_at,
        ).format('DD MMM YYYY');
        product.dataValues.generalStock = generalStock;
        product.dataValues.total_cost = parseFloat(
          product.dataValues.total_cost,
        ).toFixed(2);
      });
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
    const productData = this._parseProductData({ product });

    try {
      const result = await this.productRepository.updateProduct(
        productId,
        productData,
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

  async getStock(productVariationId) {
    try {
      const stock =
        await this.productVariationService.getStock(productVariationId);
      return {
        message: 'Stock retrieved successfully',
        status: 'success',
        data: stock,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = ProductService;
