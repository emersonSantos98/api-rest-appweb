const {AppError} = require('../../../src/error/Errors');
const bcrypt = require('bcrypt');
const {numberAleatory} = require("../../../utils/utilities");
const UserRepositories = require('../../repositories/User/UserRepositories');
const Authentication = require('../../auth/authentication');
const CodeRepositories = require("../../repositories/User/CodeRepositories");
const EmailTemplatesEnum = require("../../../enums/EmailTemplatesEnum")
const { addHours ,addMinutes,format, parse, isAfter, parseISO} = require('date-fns');
const SendGridSubscribers = require("../../../src/app/Subscribers/SendGridSubscribers");
class AuthenticationServices {

        constructor() {
            this.userRepository = new UserRepositories();
            this.authentication = new Authentication();
            this.codeRepositories = new CodeRepositories();
        }

        async login(email, password) {
            const currentDate = new Date();
            const dateInTenMinutes = addMinutes(currentDate, 10)
            const brazilianDateFormat = 'dd/MM/yyyy HH:mm:ss'
            const dateExpire = format(dateInTenMinutes, brazilianDateFormat);

            let two_factor_status = null
             if(!email || !password) {
                throw new AppError('Dados insuficientes.', 400);
             }

             const user = await this.userRepository.findByEmail(email).catch(error => {
                    throw new AppError(error.message, 500);
             })


             if (!user) {
                throw new AppError('E-mail ou senha inválidos', 401);
             }

             const isPasswordValid = await bcrypt.compare(password, user.password).catch(error => {
                throw new AppError(error.message, 500);
             })

            if (!isPasswordValid) {
                throw new AppError('E-mail ou senha inválidos', 401);
            }
            if(user.two_factor === 1){

                const expireTimeDate = parse(user.date_two_factor, 'dd/MM/yyyy HH:mm:ss', new Date());
                const expireTimePlus24Hours = new Date(expireTimeDate.getTime() + 24 * 60 * 60 * 1000);


                if(isAfter(currentDate, expireTimePlus24Hours) || user.date_two_factor === null){
                    const code = await numberAleatory().catch(
                        error => {
                            throw new AppError('Erro ao gerar codigo',error.status)
                        }
                    );
                    await SendGridSubscribers.verifyEmail({
                        code: code,
                        name: user.first_name,
                        email: user.email,
                        type: EmailTemplatesEnum.Templates.VERIFY_EMAIL,
                    });

                    await this.codeRepositories.updateUserId({
                        user_id: user.id })
                        .catch(
                            error => {
                                throw new AppError(error.message,error.status)
                            }
                        )
                    await this.codeRepositories.create({
                        user_id: user.id,
                        status_code: 'Ativo',
                        expire_time: dateExpire,
                        code: code
                    }).catch(
                        error => {
                            throw new AppError(error.message, error.status);
                        }
                    );
                    two_factor_status = 1
                }
                else{
                    two_factor_status = 0
                }
            }

            const token= await this.authentication.generateToken({userId: user.id, role: user.role.dataValues.name}).catch(error => {
                throw new AppError(error.message, 500);
            })

            const userAbilities = user.role.permissionusergroup.map(permissionUserGroup => (
            {
                action: permissionUserGroup.dataValues.permission.dataValues.actions,
                subject: permissionUserGroup.dataValues.permission.dataValues.subjects,
            }
            ));

            const respons = {
                userAbilities:  userAbilities,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                userData: {
                    id: user.id,
                    uuid: user.uuid,
                    first_name: user.first_name,
                    email: user.email,
                    role: user.role.name,
                    status: "ativo",
                    two_factor: two_factor_status,
                    created_at: user.createdAt,
                    updated_at: user.updatedAt,
            },
            }

            return respons;
        }
        async refreshToken(refreshToken) {
          const token = await this.authentication.generateRefreshToken(refreshToken).catch(error => {
                throw new AppError(error.message, 500);
          })

            return {accessToken: token.accessToken, refreshToken: token.refreshToken};
        }
        async verifyToken(token) {
           return ({message: 'Token válido'})
        }
        async me(userId) {
            const user = await this.userRepository.findOne(userId).catch(error => {
                throw new AppError(error.message, 500);
            })

            if (!user) {
                throw new AppError('Usuário não encontrado', 404);
            }
            const userAbilities = user.role.permissionusergroup.map(permissionUserGroup => (
                {
                    action: permissionUserGroup.permission.actions,
                    subject: permissionUserGroup.permission.subjects,
                }
            ));

            return {
                userAbilities:  userAbilities,
                userData: {
                    uuid: user.uuid,
                    full_name: user.name,
                    username: user.name,
                    email: user.email,
                    role: user.role.name,
                    status: "ativo",
                    created_at: user.createdAt,
                    updated_at: user.updatedAt,
                },
            };
        }
}

module.exports = AuthenticationServices;
