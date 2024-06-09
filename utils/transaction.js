const { sequelize } = require("../domain/models");

async function executeInTransaction(callback) {
    const t = await sequelize.transaction();

    try {
        const result = await callback(t);
        await t.commit();
        return result;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

module.exports = { executeInTransaction };
