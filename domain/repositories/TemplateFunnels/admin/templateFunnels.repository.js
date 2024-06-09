const { Templates } = require('../../../models');
const { executeInTransaction } = require('../../../../utils/transaction');
const { Op } = require('sequelize');
class TemplateFunnelsRepository {
  async createTemplate(data) {
    return executeInTransaction(async t => {
      console.log('Template criado com sucesso');
      return await Templates.create(data, { transaction: t });
    });
  }

  async findAll({ name, status, tags, page, pageSize }) {
    console.log('entrou no findAll')
    return executeInTransaction(async t => {
      console.log('Templates recebidos com sucesso');
      const filter = {};
      if (name) {
        filter.name = { [Op.like]: `%${name}%` };
      }
      if (status) {
        filter.status = status;
      }
      if (tags) {
        filter.tags = tags;
      }

      const { rows: templates, count: totalCount } =
        await Templates.findAndCountAll({
          where: filter,
          limit: pageSize,
          offset: (page - 1) * pageSize,
          transaction: t,
        });

      return { templates, totalCount };
    });
  }

  async findOne(template_id) {
    console.log('entrou no findOne');
    return executeInTransaction(async t => {
      console.log('Template recebido com sucesso');
      return await Templates.findByPk(template_id, {
        transaction: t,
      });
    });
  }

  async findOneName(name) {
    return executeInTransaction(async t => {
      return await Templates.findOne({ where: { name }, transaction: t });
    });
  }

  async update(template_id, data) {
    return executeInTransaction(async t => {
      await Templates.update(data, { where: { template_id }, transaction: t });
      return await Templates.findByPk(template_id, { transaction: t });
    });
  }

  async delete(template_id) {
    return executeInTransaction(async t => {
      console.log('Template deletado com sucesso');
      return await Templates.destroy({
        where: { template_id },
        transaction: t,
      });
    });
  }
}

module.exports = new TemplateFunnelsRepository();
