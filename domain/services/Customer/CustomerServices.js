const { AppError } = require('../../../src/error/Errors');
const CustomerRepositories = require('../../repositories/Customer/CustomerRepositories');
const { generateUUID } = require('../../../utils/uuidGenerator');
const {
  clearSpecialCaracteres,
} = require('../../../utils/clearSpecialCaracteres');
const { findByDocument } = require('../../../utils/verifyUserDocumentExists');

class CustomerServices {
  constructor() {
    this.customerRepositories = new CustomerRepositories();
  }

  async create(body) {
    const uuid = await generateUUID();
    body.uuid = await clearSpecialCaracteres(uuid);
    const customerExist = await findByDocument(body.document);

    if (
      !body.name ||
      !body.cellphone ||
      !body.document ||
      !body.birth_date ||
      !body.user_id
    )
      throw new AppError('Dados inválidos', 400);

    if (customerExist) {
      throw new AppError('Cliente já cadastrado', 400);
    }

    const customerUserExists = await this.customerRepositories
      .findByUserId(body.user_id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (customerUserExists) {
      throw new AppError('Usuário já vinculado ao customer', 400);
    }

    const customer = await this.customerRepositories
      .create(body)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!customer) {
      throw new AppError('Não foi possível criar o cliente', 500);
    }

    return { message: 'Recurso criado com sucesso.', data: customer };
  }

  async findAll() {
    const customers = await this.customerRepositories.findAll().catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!customers) {
      throw new AppError('Nenhum cliente encontrado', 404);
    }

    return { message: 'Recursos recuperados com sucesso.', data: customers };
  }

  async findOne(data) {
    const customer = await this.customerRepositories
      .findOne(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!customer) {
      throw new AppError('Cliente não encontrado', 404);
    }

    return { message: 'Recurso recuperado com sucesso.', data: customer };
  }

  async update(id, body) {
    const customer = await this.customerRepositories
      .update(id, body)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!customer) {
      throw new AppError('Não foi possível atualizar o cliente', 500);
    }

    return { message: 'Recurso atualizado com sucesso.', data: customer };
  }

  async delete(id) {
    const customer = await this.customerRepositories.delete(id).catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!customer) {
      throw new AppError('Não foi possível deletar o cliente', 500);
    }

    return { message: `Recurso com o id ${id} com sucesso.`, data: customer };
  }
}

module.exports = CustomerServices;
