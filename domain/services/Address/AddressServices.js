const {AppError} = require('../../../src/error/Errors')
const AddressRepositories = require('../../repositories/address/AddressRepositories')
const OrganizationRepositories = require('../../repositories/Organization/OrganizationRepositories')
const { clearSpecialCaracteres } = require('../../../utils/clearSpecialCaracteres')
const {sequelize} = require('../../models');
class AddressServices {

    constructor() {
        this.addressRepositories = new AddressRepositories();
        this.organizationRepositories = new OrganizationRepositories();
    }

    async create(user_id, data) {
        const t = await sequelize.transaction();
        const {id} = await this.organizationRepositories.findOneUserId(user_id).catch((error) => {
            throw new AppError(error.message, error.status);
        })
        const enderecoExistente = await this.addressRepositories.findOneOrgId(id).catch((error) => {
            throw new AppError(error.message, error.status);
        })
        if (enderecoExistente) {
            throw new AppError('Já existe um endereço cadastrado para esta organização.', 400);
        }
         data.cep = await clearSpecialCaracteres(data.cep);
         data.numero = await clearSpecialCaracteres(data.numero);
         data.orgId = id;
        try {
            const novoEndereco = await this.addressRepositories.create(
                data.orgId,
                data.pais,
                data.cep,
                data.endereco,
                data.numero,
                data.bairro,
                data.complemento,
                data.cidade,
                data.estado,
                t
            )

            await t.commit();

            return novoEndereco;
        } catch (error) {
            await t.rollback();
            throw new AppError(error.message, error.status);
        }
    }

    async findAll() {
        const results = await this.addressRepositories.findAll().catch((error) => {
            throw new AppError(error.message, error.status);
        });
        const total = results.length;
        if (!results || total === 0) {
            throw new AppError(`Address não encontradas, total: ${total}`, 404);
        }

        return {message: 'Address encontradas', data: results, total};
    }

    async findOne(id) {
        const result = await this.addressRepositories.findOne(id).catch((error) => {
            throw new AppError(error.message, error.status);
        });

         if (!result) {
            throw new AppError('Address não encontrada', 404);
         }
        return {message: 'Address encontrada', data: result};
    }

    async update(user_id, novosDados) {
        const t = await sequelize.transaction();
        novosDados.cep = await clearSpecialCaracteres(novosDados.cep);
        novosDados.numero = await clearSpecialCaracteres(novosDados.numero);


            const idOrganizacao = await this.organizationRepositories.findOneUserId(user_id, t).catch((error) => {
                throw new AppError(error.message, error.status);
            });

            if (!idOrganizacao) {
                throw new AppError('Organização não encontrada.', 404);
            }

            const enderecoExistente = await this.addressRepositories.findOneOrgId(idOrganizacao.id, t).catch((error) => {
                throw new AppError(error.message, error.status);
            });

            if (!enderecoExistente) {
                throw new AppError('Endereço não encontrado.', 404);
            }


            if (enderecoExistente.org_id !== idOrganizacao.id) {
                throw new AppError('Este endereço não pertence à sua organização.', 403);
            }

        try {

          const result = await this.addressRepositories.update(idOrganizacao.id, novosDados, t);

            await t.commit();

             return {message: 'Address atualizada com sucesso', data: result};
        } catch (error) {
            await t.rollback();
            throw new AppError(error.message, error.status);
        }

    }

    async delete(id) {
        const result = await this.addressRepositories.delete(id).catch((error) => {
            throw new AppError(error.message, error.status);
        });
        return {message: 'Address deletada com sucesso', data: result};
    }
}
module.exports = AddressServices;
