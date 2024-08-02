const { AppError } = require('../../../src/error/Errors');
const bcrypt = require('bcrypt');
const UserRepositories = require('../../repositories/User/UserRepositories');
const Authentication = require('../../auth/authentication');
class AuthenticationServices {
  constructor() {
    this.userRepository = new UserRepositories();
    this.authentication = new Authentication();
  }

  async login(email, password) {
    if (!email || !password) {
      throw new AppError('Dados insuficientes.', 400);
    }

    const user = await this.userRepository.findByEmail(email).catch(error => {
      throw new AppError(error.message, 500);
    });

    if (!user) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const isPasswordValid = await bcrypt
      .compare(password, user.password)
      .catch(error => {
        throw new AppError(error.message, 500);
      });

    if (!isPasswordValid) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const token = await this.authentication
      .generateToken({ userId: user.id, role: user.role.dataValues.name })
      .catch(error => {
        throw new AppError(error.message, 500);
      });

    const userAbilities = user.role.permissionusergroup.map(
      permissionUserGroup => ({
        action: permissionUserGroup.dataValues.permission.dataValues.actions,
        subject: permissionUserGroup.dataValues.permission.dataValues.subjects,
      }),
    );

    const respons = {
      userAbilities: userAbilities,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      userData: {
        uuid: user.uuid,
        full_name: user.first_name + ' ' + user.last_name,
        email: user.email,
        role: user.role.name,
        status: 'ativo',
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    };

    return respons;
  }

  async refreshToken(refreshToken) {
    const token = await this.authentication
      .generateRefreshToken(refreshToken)
      .catch(error => {
        throw new AppError(error.message, 500);
      });

    return { accessToken: token.accessToken, refreshToken: token.refreshToken };
  }

  async verifyToken(token) {
    return { message: 'Token válido' };
  }
}

module.exports = AuthenticationServices;
