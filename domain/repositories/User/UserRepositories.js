const {
  User,
  Customer,
  Organization,
  PasswordUserOld,
} = require('../../models');
const { Op } = require('sequelize');

class UserRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.create(body);

        const customer = await Customer.create({
          uuid: body.uuid,
          user_id: user.id,
          name: body.name,
          typeDocument: body.document_type,
          cellphone: body.cellphone,
          document: body.document,
          status: body.status,
          birth_date: body.birth_date,
        });

        const organization = await Organization.create({
          user_id: user.id,
          name: body.orgname,
          countryCode: body.countryCode,
          document: body.document,
          typeDocument: body.document_type,
        });

        const passwordUserOld = await PasswordUserOld.create({
          user_id: user.id,
          password_old: body.password,
        });

        resolve({ user, customer, organization, passwordUserOld });
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(queries) {
    return new Promise(async (resolve, reject) => {
      try {
        const where = {};
        if (queries.name) {
          where.name = {
            [Op.like]: `%${queries.name}%`,
          };
        }
        if (queries.email) {
          where.email = {
            [Op.like]: `%${queries.email}%`,
          };
        }

        if (queries.role) {
          where['$role.name$'] = {
            [Op.like]: `%${queries.role}%`,
          };
        }
        console.log(where);
        const users = await User.findAll({
          where,
          include: [
            {
              model: Customer,
              as: 'customers',
              attributes: [
                'name',
                'typeDocument',
                'cellphone',
                'document',
                'status',
                'popup_notification',
                'birth_date',
              ],
            },
            {
              association: 'role',
              include: [
                {
                  association: 'permissionusergroup',
                  include: [
                    {
                      association: 'permission',
                    },
                  ],
                },
              ],
            },
          ],
        });

        const usersData = users.map(user => {
          const userData = user.toJSON();
          if (userData.customers && userData.customers.length > 0) {
            const customerData = userData.customers[0];
            delete userData.customers;
            return { ...userData, ...customerData };
          }
          return userData;
        });

        resolve(usersData);
      } catch (error) {
        reject({ message: error.message, status: 500 });
      }
    });
  }

  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByPk(id, {
          include: [
            {
              model: Customer,
              as: 'customers',
              attributes: [
                'name',
                'typeDocument',
                'cellphone',
                'document',
                'status',
                'popup_notification',
                'birth_date',
              ],
            },
            {
              association: 'role',
              include: [
                {
                  association: 'permissionusergroup',
                  include: [
                    {
                      association: 'permission',
                    },
                  ],
                },
              ],
            },
            {
              model: PasswordUserOld,
              as: 'passwordOlds',
              attributes: ['password_old'],
            },
          ],
        });

        if (!user) {
          return null;
        }

        let userData = user.toJSON();
        if (userData.customers && userData.customers.length > 0) {
          const customerData = userData.customers[0];
          delete userData.customers;
          userData = { ...userData, ...customerData };
        }

        resolve(userData);
      } catch (error) {
        reject({ message: error.message, status: 500 });
      }
    });
  }

  async update(id, body) {
    return new Promise(async (resolve, reject) => {
      try {
        await User.update(body, {
          where: {
            id,
          },
        });
        const userUpdated = await User.findByPk(id);
        resolve(userUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.destroy({
          where: {
            id,
          },
        });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  async updatePassword(id, password) {
    console.log(id, password);
    return new Promise(async (resolve, reject) => {
      try {
        await User.update(
          { password: password },
          {
            where: {
              id,
            },
          },
        );
        const userUpdated = await User.findByPk(id);
        resolve(userUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }
  async updateTwo_factor(two_factor, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userUpdated = await User.update(
          { two_factor: two_factor },
          {
            where: {
              id: user_id,
            },
          },
        );
        resolve(userUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }
  async updateDateTwofactor(body) {
    console.log(body);
    return new Promise(async (resolve, reject) => {
      try {
        const userUpdated = await User.update(
          { date_two_factor: body.date_two_factor },
          {
            where: {
              id: body.user_id,
            },
          },
        );
        resolve(userUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
          include: [
            {
              association: 'role',
              attributes: ['name'],
              include: [
                {
                  association: 'permissionusergroup',
                  as: 'permissionusergroup',
                  include: [
                    {
                      association: 'permission',
                    },
                  ],
                },
              ],
            },
          ],
        });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = UserRepositories;
