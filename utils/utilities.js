const bcrypt = require("bcrypt");


async function hashPassword(password) {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}

async function numberAleatory() {
    return new Promise(async (resolve, reject) => {
        try {
            const codigo = Math.floor(100000 + Math.random() * 900000);
            resolve(codigo)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { hashPassword , numberAleatory};
