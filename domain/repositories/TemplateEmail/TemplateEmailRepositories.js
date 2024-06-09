const { TemplateEmails } = require('../../models');

class TemplateEmailRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const templateEmail = await TemplateEmails.create(body);
        resolve(templateEmail);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const templateEmails = await TemplateEmails.findAll();

        resolve(templateEmails);
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
            console.log(idOrName, 'type');
            queryOptions = { where: { type: idOrName } };
          } else {
            console.log(idOrName, 'id');
            queryOptions = { where: { id: idOrName } };
          }
        }

        const templateEmail = await TemplateEmails.findOne(queryOptions);
        resolve(templateEmail);
      } catch (error) {
        reject(error);
      }
    });
  }
  async update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        await TemplateEmails.update(data, {
          where: { id: id },
        });
        const templateEmailUpdated = await TemplateEmails.findOne({
          where: { id: id },
        });
        resolve(templateEmailUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const templateEmail = await TemplateEmails.destroy({
          where: {
            id,
          },
        });
        resolve(templateEmail);
      } catch (error) {}
    });
  }
}

module.exports = TemplateEmailRepositories;
