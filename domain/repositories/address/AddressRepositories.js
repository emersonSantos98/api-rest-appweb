const { Address } = require('../../models');



class AddressRepositories {
    constructor() {
        this.model = Address;
    }

    async create(orgId, pais, cep, endereco, numero, bairro, complemento, cidade, estado, transaction) {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.model.create({
                        org_id: orgId,
                        pais,
                        cep,
                        endereco,
                        numero,
                        bairro,
                        complemento,
                        cidade,
                        estado,
                    },
                    { transaction });
                resolve(address)
            } catch (error) {
                reject(error)
            }
        });
    }

    async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.model.findAll();
                resolve(address)
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.model.findOne( {where: {id: id} });
                resolve(address)
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOneOrgId(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.model.findOne( {where: {org_id: id}});
                resolve(address)
            } catch (error) {
                reject(error)
            }
        })
    }

    async update(id, data, transaction = null) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.update(data, {where: {org_id: id}, transaction});
                const address = await this.model.findOne({where: {id: id}, transaction });
                resolve(address)
            } catch (error) {
                reject(error)
            }
        })
    }

    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const address = await this.model.destroy({
                    where: {id: id}
                });
                resolve(address)
            } catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = AddressRepositories

