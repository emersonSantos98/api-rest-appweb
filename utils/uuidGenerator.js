const { v4: uuidv4 } = require('uuid');
const database = require("../domain/models");

async function generateUUID() {
    const uuidUser = uuidv4();
    const uuidExist = await database.User.findOne({ where: { uuid: uuidUser } })
    if (uuidExist) {
        await generateUUID()
    }
    return uuidUser
}





module.exports = {
    generateUUID,
}
