const { Funnel } = require('../../models');

class FunnelsRepositories {
  async create(body) {
    console.log('body', body);
    return new Promise(async (resolve, reject) => {
      try {
        const funnel = await Funnel.create(body);
        console.log('funnel', funnel);
        resolve(funnel);
      } catch (error) {
        console.log('error', error);
        reject(error);
      }
    });
  }
  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const funnels = await Funnel.findAll();
        resolve(funnels);
      } catch (error) {
        reject(error);
      }
    });
  }
  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const funnel = await Funnel.findOne({ where: { id: id } });
        resolve(funnel);
      } catch (error) {
        reject(error);
      }
    });
  }
  async update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        await Funnel.update(data, {
          where: { id: id },
        });
        const funnelUpdated = await Funnels.findOne({
          where: { id: id },
        });
        resolve(funnelUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const funnel = await Funnel.destroy({ where: { id: id } });
        resolve(funnel);
      } catch (error) {
        reject(error);
      }
    });
  }
}
module.exports = FunnelsRepositories;
