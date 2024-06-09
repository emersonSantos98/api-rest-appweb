const { AppError } = require('../../../src/error/Errors');
const bcrypt = require('bcrypt');
const {hashPassword,numberAleatory} = require("../../../utils/utilities");
const UserRepositories = require("../../repositories/User/UserRepositories")
const PasswordUserOldRepositories = require("../../repositories/PasswordUserOld/PasswordUserOldRepositories")
const CodeRepositories = require("../../repositories/User/CodeRepositories")
const {sendEmail} = require("../../../src/app/Subscribers/SendGridSubscribers")
const EmailTemplatesEnum = require("../../../enums/EmailTemplatesEnum")
const { addMinutes,format } = require('date-fns');
const SendGridSubscribers = require("../../../src/app/Subscribers/SendGridSubscribers");
class SecurityServices {

    constructor() {
        this.userRepositories = new UserRepositories();
        this.codeRepositories = new CodeRepositories();
        this.passwordUserOldRepositories = new PasswordUserOldRepositories();

    }

    async changePassword(body) {
     const resultUser = await this.userRepositories.findOne(body.userId)
         .catch(
         error => {
             throw new AppError(error.message,error.status)
         }
     )
        const isPasswordOldValid = await bcrypt.compare(body.passwordOld, resultUser.password).catch(error => {
            throw new AppError(error.message, 500);
        })
        if (!isPasswordOldValid) {
            throw new AppError('Senha antiga invalida', 400);
        }
        if(body.newPassword !== body.newPasswordConfirmation){
            throw new AppError('Senha não se coincidem', 400);
        }
        for (const oldPassword of resultUser.passwordOlds) {
            const isMatch = await bcrypt.compare(body.newPassword, oldPassword.password_old).catch(error => {
                throw new AppError(error.message, 500);
            });
            if (isMatch) {
                throw new AppError('Senha ja utilizada', 400);
            }
        }
        const passwordHash = await hashPassword(body.newPassword);
        const updatePassword = await this.userRepositories.updatePassword(body.userId,passwordHash)
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        const insertPasswordOld = await this.passwordUserOldRepositories.create({
            password_old : passwordHash,
            user_id : body.userId,
        })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
        })

        return {
            message: 'Senha Alterada.',
            data: updatePassword,insertPasswordOld
        };
    }
    async forgotPassword(email,type) {
        console.log(email,type)
        console.log(type === 'resetPassword')
        const currentDate = new Date();
        const dateInTenMinutes = addMinutes(currentDate, 10)
        const brazilianDateFormat = 'dd/MM/yyyy HH:mm:ss'
        const date = format(dateInTenMinutes, brazilianDateFormat)
        const resultUser = await this.userRepositories.findByEmail(email)
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        if (!resultUser) {
            throw new AppError('Email invalido', 400);
        }
        const code = await numberAleatory().catch(
            error => {
                throw new AppError('Erro ao gerar codigo',error.status)
            }
        );
        if(type === 'verifyEmail'){
            console.log('verifyEmail')
            await SendGridSubscribers.verifyEmail({
                code: code,
                name: resultUser.first_name,
                email: email,
                type: EmailTemplatesEnum.Templates.VERIFY_EMAIL,
            });
        }
        if(type === 'resetPassword'){
            console.log('resetPasword')
            await SendGridSubscribers.resetPassword({
                code: code,
                name: resultUser.first_name,
                email: email,
                type: EmailTemplatesEnum.Templates.RESET_PASSWORD,
            });
        }
        await this.codeRepositories.updateUserId({
            user_id: resultUser.id })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        await this.codeRepositories.create({
            user_id: resultUser.id , status_code: 'Ativo', expire_time: date, code: code })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        return {
            message: `Email enviado para ${email}`,
            email: email,
            user_id: resultUser.id
        };
    }
    async resetPassword(newPassword, newPasswordConfirmation,user_id) {
        const resultUser = await this.userRepositories.findOne(user_id)
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
       if(newPassword !== newPasswordConfirmation){
           throw new AppError('Senha nao se coincidem.', 400);
       }
        for (const oldPassword of resultUser.passwordOlds) {
            const isMatch = await bcrypt.compare(newPassword, oldPassword.password_old).catch(error => {
                throw new AppError(error.message, 500);
            });
            if (isMatch) {
                throw new AppError('Senha ja utilizada', 400);
            }
        }
        const passwordHash = await hashPassword(newPassword);

        const updatePassword = await this.userRepositories.updatePassword(user_id,passwordHash)
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        const insertPasswordOld = await this.passwordUserOldRepositories.create({
            password_old : passwordHash,
            user_id : user_id,
        })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                })
        return {
            message: `Senha alterada com sucesso`,
            data: updatePassword,insertPasswordOld
        };
    }
    async two_factor_status(two_factor,user_id) {
        await this.userRepositories.updateTwo_factor(two_factor,user_id)
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        return {
            message: `Two Factor updated`,
        };
    }
}

module.exports = SecurityServices;
