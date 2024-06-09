const { AppError } = require('../../../src/error/Errors');
const { hashPassword } = require('../../../utils/utilities');

const PasswordUserOldRepositories = require('../../repositories/PasswordUserOld/PasswordUserOldRepositories');


class PasswordUserOldServices {
    constructor() {
        this.passwordUserOldRepositories = new PasswordUserOldRepositories();
    }

    async create(body) {
        const passwordHash = await hashPassword(body.password_old);
        if (
            !body.password_old || !body.user_id
        ) {
            throw new AppError('Está faltando dados', 400);
        }

        body.password_old = passwordHash;
        const passwordOld = await this.passwordUserOldRepositories.create(body).catch(error => {
            throw new AppError(error.message, error.status);
        });

        if (!passwordOld) {
            throw new AppError('Não foi possível criar um registro da senha', 500);
        }

        return { message: 'Recurso criado com sucesso.', data: passwordOld };
    }

    async findAll() {
        const passwordsOld = await this.passwordUserOldRepositories.findAll().catch(error => {
            throw new AppError(error.message, error.status);
        });

        const total = passwordsOld.length;

        if (!passwordsOld || total === 0) {
            throw new AppError('Nenhuma senha encontrada', 404);
        }

        return {
            message: 'Recursos recuperados com sucesso.',
            data: passwordsOld,
            total: total,
        };
    }

    async findOne(user_id) {
        const passwordsOld = await this.passwordUserOldRepositories.findByUserId(user_id).catch(error => {
            throw new AppError(error.message, error.status);
        });

        if (!passwordsOld) {
            throw new AppError('Usuário não encontrado', 404);
        }

        return { message: 'Recurso recuperado com sucesso.', data: passwordsOld };
    }


}

module.exports = PasswordUserOldServices;
