// Desc: Funções auxiliares para validação de campos
const moment = require('moment');
const { cpf, cnpj } = require('cpf-cnpj-validator');
async function user_fields_validation(body) {
    return new Promise(async (resolve, reject) => {
        if (!body.first_name) {
            reject({message: 'O nome é obrigatório', status: 400});
        }

        if (!body.last_name) {
            reject({message: 'O sobrenome é obrigatório', status: 400});
        }

        if (!body.email) {
            reject({message: 'O email é obrigatório', status: 400});
        }

        if (!body.password && !body.passwordConfirmation) {
            reject({message: 'A senha é obrigatória', status: 400});
        }

        if (!body.password) {
            reject({message: 'A senha é obrigatória', status: 400});
        }

        if (body.password !== body.passwordConfirmation) {
            reject({message: 'As senhas não correspondem', status: 400});
        }

        if (!body.user_type) {
            reject({message: 'O tipo de usuário é obrigatório', status: 400});
        }

        if (!body.cellphone) {
            reject({message: 'O celular é obrigatório', status: 400});
        }

        if (!body.document) {
            reject({message: 'O documento é obrigatório', status: 400});
        }

        if (!body.birth_date) {
            reject({message: 'A data de nascimento é obrigatória', status: 400});
        }


        resolve(true);
    })
}

async function format_date(date) {
    return new Promise(async (resolve, reject) => {

        const dataFormatada = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        resolve(dataFormatada);
    })
}

async function validate_cpf_cnpj(document) {
    return new Promise(async (resolve, reject) => {
        if (document.length === 11) {
            if (!cpf.isValid(document)) {
                reject({message: 'CPF inválido', status: 400});
            }
            resolve({type:'f',  message: 'CPF válido', status: 200})
        } else if (document.length === 14) {
            if (!cnpj.isValid(document)) {
                reject({message: 'CNPJ inválido', status: 400});
            }
            resolve({type:'j',  message: 'CNPJ válido', status: 200})
        } else {
            reject({message: 'Documento inválido', status: 400});
        }

        resolve(true);
    })
}

module.exports = {user_fields_validation, format_date, validate_cpf_cnpj};
