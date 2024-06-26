const { AppError } = require('../../../src/error/Errors');
const { generateUUID } = require('../../../utils/uuidGenerator');
const { userExists } = require('../../../utils/verifyUserExists');
const {
  clearSpecialCaracteres,
} = require('../../../utils/clearSpecialCaracteres');
const { hashPassword } = require('../../../utils/utilities');
const {
  user_fields_validation,
  format_date,
  validate_cpf_cnpj,
} = require('../../../utils/helpers');

const UserRepositories = require('../../repositories/User/UserRepositories');
const UserGroupService = require('../UserGroup/UserGroupServices');
class UserServices {
  constructor() {
    this.userRepositories = new UserRepositories();
    this.userGroupService = new UserGroupService();
  }

  async create(body) {
    body.cellphone = await clearSpecialCaracteres(body.cellphone);
    body.document = await clearSpecialCaracteres(body.document);
    await user_fields_validation(body).catch(error => {
      throw new AppError(error.message, error.status);
    });
    await userExists(body).catch(error => {
      throw new AppError(error.message, error.status);
    });
    const passwordHash = await hashPassword(body.password);
    const { type } = await validate_cpf_cnpj(body.document).catch(error => {
      throw new AppError(error.message, error.status);
    });
    const userGroup = await this.userGroupService.findOne(body.user_type);

    body.user_group_id = userGroup.data.id;
    const uuid = await generateUUID();
    const orgname = body.email.split('@')[0];
    body.countryCode = 'BR';
    body.orgname = orgname;
    body.name = body.first_name + ' ' + body.last_name;
    body.status = 1;
    body.uuid = await clearSpecialCaracteres(uuid);
    body.cellphone = await clearSpecialCaracteres(body.cellphone);
    body.document = await clearSpecialCaracteres(body.document);
    body.document_type = type;
    body.birth_date = await format_date(body.birth_date);

    body.password = passwordHash;
    delete body.passwordConfirmation;

    const user = await this.userRepositories.create(body).catch(error => {
      throw new AppError(error.message, error.status);
    });

    return { message: 'Recurso criado com sucesso.', data: user };
  }

  async findAll(queries) {
    const users = await this.userRepositories.findAll(queries).catch(error => {
      throw new AppError(error.message, error.status);
    });

    const total = users.length;

    if (!users || total === 0) {
      throw new AppError('Nenhum usuário encontrado', 404);
    }

    return {
      message: 'Recursos recuperados com sucesso.',
      data: users,
      total: total,
    };
  }

  async findOne(id) {
    const user = await this.userRepositories.findOne(id).catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!user || user === null) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return { message: 'Recurso recuperado com sucesso.', data: user };
  }

  async update(id, body) {
    const passwordHash = body.password
      ? await hashPassword(body.password)
      : null;

    if (body.password && !body.passwordConfirmation) {
      throw new AppError('A confirmação da senha é obrigatória', 400);
    }

    if (body.password && body.password !== body.passwordConfirmation) {
      throw new AppError('As senhas não correspondem', 400);
    }

    if (body.password) {
      body.password = passwordHash;
      delete body.passwordConfirmation;
    } else {
      delete body.password;
      delete body.passwordConfirmation;
    }

    await this.findOne(id);

    const user = await this.userRepositories.update(id, body).catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!user) {
      throw new AppError('Não foi possível atualizar o usuário', 500);
    }

    return { message: 'Recurso atualizado com sucesso.', data: user };
  }

  async delete(id) {
    const user = await this.userRepositories.delete(id).catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!user) {
      throw new AppError('Não foi possível excluir o usuário', 500);
    }

    return { message: `Recurso com id ${id} excluído com sucesso.` };
  }
}

module.exports = UserServices;
