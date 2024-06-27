// Product.repository.js
// Define your repository methods here
const { Product } = require('../../models');
class ProductRepository {
  // Example repository method

  async createProduct(product) {
    console.log('product', product)
    return await Product.create(product);
  }
  async findAllProducts() {
    return await Product.findAll();
  }
  async findOneProduct(productId) {
    return await Product.findByPk(productId);
  }
  async updateProduct(productId, product) {
    return await Product.update(product, { where: { id: productId } });
  }
  async deleteProduct(productId) {
    console.log('productId', productId)
    return await Product.destroy({ where: { id: productId } });
  }
}

module.exports = ProductRepository;
