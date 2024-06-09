const { Customer } = require('../../models');

class CustomerRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await Customer.create(body);
        resolve(customer);
      } catch (error) {
        reject(error);
      }
    });
  }
  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const customers = await Customer.findAll({
          include: [
            {
              association: 'user',
            },
          ],
        });
        resolve(customers);
      } catch (error) {
        reject(error);
      }
    });
  }
  async findOne(idOrName = null) {
    return new Promise(async (resolve, reject) => {
      try {
        let queryOptions = {};
        if (idOrName) {
          if (isNaN(idOrName)) {
            queryOptions = {
              where: { name: idOrName },
              include: [{ association: 'user' }],
            };
          } else {
            queryOptions = {
              where: { id: idOrName },
              include: [{ association: 'user' }],
            };
          }
        }

        const consumer = await Customer.findOne(queryOptions);
        resolve(consumer);
      } catch (error) {
        reject(error);
      }
    });
  }
  async update(user_id, body) {
    return new Promise(async (resolve, reject) => {
      try {
        await Customer.update(body, {
          where: {
            user_id,
          },
        });

        const customerUpdated = await this.findByUserId(user_id);
        resolve(customerUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await Customer.destroy({
          where: {
            id,
          },
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByUserId(user_Id) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await Customer.findOne({
          where: {
            user_Id,
          },
        });
        resolve(customer);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = CustomerRepositories;
