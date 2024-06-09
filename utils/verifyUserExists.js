const { User, Customer } = require('../domain/models');

async function userExists(body) {

    return new Promise(async (resolve, reject) => {
        const email = await User.findOne({ where: { email: body.email } });
        if (email) {
            reject({message: 'Este email já está em uso', status: 400});
        }

        const document = await Customer.findOne({ where: { document: body.document } });
        if (document) {
            reject({message: 'Este documento já está em uso', status: 400});
        }

        const cellphone = await Customer.findOne({ where: { cellphone: body.cellphone } });

        if (cellphone) {
            reject({message: 'Este celular já está em uso', status: 400});
        }

        resolve(true);
    })
}


module.exports = {userExists};
