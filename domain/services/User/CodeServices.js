const { AppError } = require('../../../src/error/Errors');
const CodeRepositories = require("../../repositories/User/CodeRepositories")
const UserRepositories = require("../../repositories/User/UserRepositories")
const SendGridSubscribers = require("../../../src/app/Subscribers/SendGridSubscribers")
const { isAfter, parse,format } = require('date-fns');
class CodeServices {

    constructor() {
        this.codeRepositories = new CodeRepositories();
        this.userRepositories = new UserRepositories();
    }

    async createCode(body) {
        const currentDate = new Date();
        const dateInTenMinutes = addMinutes(currentDate, 10); // Adiciona 10 minutos à data atual
        const brazilianDateFormat = 'dd/MM/yyyy HH:mm:ss';
        const date = format(dateInTenMinutes, brazilianDateFormat);
        const resultCode =  await this.codeRepositories.create({
            user_id: body.user_id , status_code: 'Ativo', expire_time: date, code: body.code })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        console.log(resultCode)

        return {
            message: `Codigo gerado para ${email}`,
            codigo: code,
            user_id: resultUser.id
        };
    }
    async validationCode(body) {
        const currentDate = new Date();
        const brazilianDateFormat = 'dd/MM/yyyy HH:mm:ss';
        const date = format(currentDate, brazilianDateFormat);
        const resultCode =  await this.codeRepositories.findOne({
            user_id: body.user_id , code: body.code })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        if(!resultCode){
            throw new AppError('Codigo invalido', 400);
        }
        const expireTimeDate = parse(resultCode.expire_time, 'dd/MM/yyyy HH:mm:ss', new Date());

        if (isAfter(currentDate, expireTimeDate)) {
            await this.codeRepositories.update({
                user_id: body.user_id , code: body.code })
                .catch(
                    error => {
                        throw new AppError(error.message,error.status)
                    }
                )
            throw new AppError('Código expirado', 400);
        }
        if (resultCode.status_code === 'Inativo') {
            throw new AppError('Código ja usado', 400);
        }
        await this.codeRepositories.update({
            user_id: body.user_id , code: body.code })
            .catch(
                error => {
                    throw new AppError(error.message,error.status)
                }
            )
        if(body.type === 'two_factor'){
            await this.userRepositories.updateDateTwofactor({
                user_id: body.user_id , date_two_factor: date })
                .catch(
                    error => {
                        throw new AppError(error.message,error.status)
                    }
                )
        }
        return {
            message: `Codigo valido`,
            valid: true,
            user_id: body.id
        };
    }

}

module.exports = CodeServices;
