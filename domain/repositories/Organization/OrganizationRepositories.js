const {Organization} = require('../../models');


class OrganizationRepositories {
    constructor() {
        this.model = Organization;
    }

    async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const organization = await this.model.create(data);
                resolve(organization)
            } catch (error) {
                reject(error)
            }
        });
    }

    async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const organizations = await this.model.findAll(
                    {
                        include: [
                            {
                                association: 'address',
                            },
                        ],
                    }
                );
                resolve(organizations)
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOne(user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const organization = await this.model.findOne(
                    {
                        where: {user_id: user_id},
                        include: [
                            {
                                association: 'address',
                            },
                        ],
                    },
                );
                resolve(organization)
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOneUserId(user_id, transaction) {
        return new Promise(async (resolve, reject) => {
            try {
                const organization = await this.model.findOne( {where: {user_id: user_id}, transaction});
                resolve(organization)
            } catch (error) {
                reject({message: error.message, status: 500});
            }
        })
    }

    async update(user_id, data, transaction) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.update(data, {
                    where: {user_id: user_id},
                    transaction
                });
                const organizationUpdated = await this.model.findOne({where: {user_id: user_id}, transaction });
                resolve(organizationUpdated)
            } catch (error) {
                reject(error.message, 500)
            }
        })
    }

    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const organization = await this.model.destroy({
                    where: {id: id}
                });
                resolve(organization)
            } catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = OrganizationRepositories

