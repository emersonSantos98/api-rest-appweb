// Product.repository.js
// Define your repository methods here
const { Product, Calculation, User, ProductVariation, StockMovement } = require('../../models');
class ProductRepository {
  // Example repository method

  async createProduct(product) {
    return await Product.create(product);
  }
  async findAllProducts() {
    return await Product.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: [
            'id',
            'uuid',
            'first_name',
            'last_name',
            'email',
            'email',
          ],
        },
        {
          model: Calculation,
          as: 'calculations',
        },
        {
          model: ProductVariation,
          as: 'variations',
          include: [
            {
              model: StockMovement,
              as: 'stockMovements',
            },
          ],
        },
      ],
    });
  }
  async findOneProduct(productId) {
    return await Product.findByPk(productId, {
        include: [
            {
            model: User,
            as: 'user',
            attributes: [
                'id',
                'uuid',
                'first_name',
                'last_name',
                'email',
                'email',
            ],
            },
            {
            model: Calculation,
            as: 'calculations',
            },
            {
            model: ProductVariation,
            as: 'variations',
            include: [
                {
                model: StockMovement,
                as: 'stockMovements',
                },
            ],
            },
        ],
        });
  }
  async updateProduct(productId, product) {
    return await Product.update(product, { where: { id: productId } });
  }
  async deleteProduct(productId) {
    console.log('productId', productId);
    return await Product.destroy({ where: { id: productId } });
  }
}

module.exports = ProductRepository;
