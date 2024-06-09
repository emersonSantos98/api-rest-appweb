const {AppError} = require('../../../src/error/Errors')
const OrganizationRepositories  = require('../../repositories/Organization/OrganizationRepositories')
const { clearSpecialCaracteres } = require('../../../utils/clearSpecialCaracteres')
const { sequelize } = require('../../../domain/models');
const { validate_cpf_cnpj } = require("../../../utils/helpers");
class OrganizationServices {

    constructor() {
        this.organizationRepositories = new OrganizationRepositories();
    }


    async create(data) {
        const organization = await this.organizationRepositories .create(data).catch((error) => {
            throw new AppError(error.message, error.status);
        });
        return {message: 'Organization criada com sucesso', data: organization};
    }

    async findAll() {
        const organization = await this.organizationRepositories .findAll().catch((error) => {
            throw new AppError(error.message, error.status);
        });
        const total = organization.length;
        if (!organization || total === 0) {
            throw new AppError(`Organizations não encontradas, total: ${total}`, 404);
        }

        return {message: 'Organizations encontradas', data: organization, total};
    }

    async findOne(user_id) {
        const organization = await this.organizationRepositories.findOne(user_id).catch((error) => {
            throw new AppError(error.message, error.status);
        });

         if (!organization || organization === null) {
            throw new AppError('Organization não encontrada', 404);
         }
        return {message: 'Organization encontrada', data: organization};
    }

    async update(user_id, data) {
         data.user_id = user_id;
         data.document = await clearSpecialCaracteres(data.document);
        const {type} = await validate_cpf_cnpj(data.document).catch(error => {
            throw new AppError(error.message, error.status);
        });

        data.typeDocument = type;
         const t = await sequelize.transaction();

        const organization = await this.organizationRepositories.update(user_id, data,t).catch(async (error) => {
            await t.rollback();
            throw new AppError(error.message, error.status);
        });
          await t.commit();

        return {message: 'Organization atualizada com sucesso', data: organization};

    }

    async delete(id) {
        const organization = await this.organizationRepositories.delete(id).catch((error) => {
            throw new AppError(error.message, error.status);
        });
        return {message: 'Organization deletada com sucesso', data: organization};
    }
}
module.exports = OrganizationServices;
