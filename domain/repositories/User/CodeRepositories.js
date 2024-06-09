const {
    code_validation, User
} = require('../../models');

class CodeRepositories {
    async create(body) {
        console.log(body)
        return new Promise(async (resolve, reject) => {
            try {
                const code = await code_validation.create(body);
                resolve(code)
            } catch (error) {
                reject(error);
            }
        });
    }

    async update(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const resultCode =  await code_validation.update({ status_code: 'Inativo' },{
                    where: {
                        code: body.code,
                        user_id: body.user_id
                    },
                });
                resolve(resultCode);
            } catch (error) {
                reject(error);
            }
        });
    }
    async updateUserId(body) {
        console.log('updateUserId')
        return new Promise(async (resolve, reject) => {
            try {
                const resultCode =  await code_validation.update({ status_code: 'Inativo' },{
                    where: {
                        user_id: body.user_id
                    },
                });
                resolve(resultCode);
            } catch (error) {
                reject(error);
            }
        });
    }
    async findOne(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const resultCode = await code_validation.findOne({
                    where: {
                        code: body.code,
                        user_id: body.user_id
                    },
                });
                resolve(resultCode) ;
            } catch (error) {
                reject(error) ;
            }
        });

    }

}

module.exports = CodeRepositories;
