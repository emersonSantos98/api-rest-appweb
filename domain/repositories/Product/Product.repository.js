// Product.repository.js
// Define your repository methods here
const {
  Product,
  Calculation,
  User,
  ProductVariation,
  StockMovement,
} = require('../../models');
const { Op } = require('sequelize');
const moment = require('moment');
moment.locale('pt-br');
class ProductRepository {
  // Example repository method

  async createProduct(product) {
    return await Product.create(product);
  }
  async findAllProducts(query, page, pageSize) {
    const filters = {};
    if (query.name_product) {
      filters.name_product = {
        [Op.like]: `%${query.name_product}%`,
      };
    }
    if (query.id) {
      filters.id = query.id;
    }

    if (query && query.date_initial && query.date_final) {
      query.date_initial = moment(query.date_initial).format(
        'YYYY-MM-DD HH:mm:ss',
      );
      query.date_final = moment(query.date_final).format('YYYY-MM-DD HH:mm:ss');
      filters.createdAt = {
        [Op.between]: [query.date_initial, query.date_final],
      };
    }

    const { count, rows: Products } = await Product.findAndCountAll({
      where: filters,
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
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
      order: [['createdAt', 'DESC']],
    });
    return {
      data: Products,
      meta: {
        page: parseInt(page),
        pageSize,
        pageCount: Math.ceil(count / pageSize),
        total: count,
      },
    };
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
