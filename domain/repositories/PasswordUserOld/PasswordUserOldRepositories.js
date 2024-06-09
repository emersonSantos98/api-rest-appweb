const {
    PasswordUserOld
} = require('../../models');
class PasswordUserOldRepositories {
    async create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const passwordUserOld = await PasswordUserOld.create(body);
                resolve(passwordUserOld);
            } catch (error) {
                reject(error);
            }
        });
    }

    async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                 const passwordsUserOld = await PasswordUserOld.findAll();
                resolve(passwordsUserOld);
            } catch (error) {
                reject(error);
            }
        });
    }

    async findByUserId(user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const passwordsByUserOld = await PasswordUserOld.findAll({
                    where: {
                        user_id,
                    },
                });
                resolve(passwordsByUserOld);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PasswordUserOldRepositories;
