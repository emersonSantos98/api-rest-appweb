const { Languages } = require('../../models');

class LanguagesRepositories {
  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const languages = await Languages.findAll();
        resolve(languages);
      } catch (error) {
        reject(error);
      }
    });
  }
  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let queryOptions = {};

        if (id) {
          if (isNaN(id)) {
            console.log(id, 'type');
            queryOptions = { where: { type: id } };
          } else {
            console.log(id, 'id');
            queryOptions = { where: { id: id } };
          }
        }

        const language = await Languages.findOne(queryOptions);
        resolve(language);
      } catch (error) {
        reject(error);
      }
    });
  }
  async update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        await Languages.update(data, {
          where: { id: id },
        });
        const languageUpdated = await Languages.findOne({
          where: { id: id },
        });
        resolve(languageUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const language = await Languages.destroy({
          where: {
            id,
          },
        });
        resolve(language);
      } catch (error) {
        reject(error);
      }
    });
  }
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const language = await Languages.create(body);
        resolve(language);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = LanguagesRepositories;
