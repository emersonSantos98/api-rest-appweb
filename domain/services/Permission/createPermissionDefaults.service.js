const {AppError} = require("../../../src/error/Errors");
const {sequelize} = require('../../models')
const PermissionRepository = require("../../repositories/permission/PermissionRepositories");
module.exports = class CreatePermissionDefaultsService {
    constructor() {
        this.repository = new PermissionRepository();
    }

    async execute(data) {
        return await sequelize.transaction(async (t) => {
            try {
                const permissionsExist = await this.repository.findOneBySubject(data.subjects)
                if (permissionsExist) {
                    throw new AppError('Permission já existe', 400);
                }
                const permissionsIds = [];
                const labelPermissionCreated = ['create', 'read', 'update', 'delete', 'manage'];
                for (let label of labelPermissionCreated) {
                    const permissionCreated = await this.repository.create({
                        actions: label,
                        subjects: data.subjects,
                    })
                    permissionsIds.push(permissionCreated.id);
                }
                let dataPermissions = permissionsIds.map(async (id) => {
                    return await this.repository.findOne(id);
                })
                return {
                    message: 'Permissions criadas com sucesso',
                    data: dataPermissions
                };

            } catch (e) {
                t.rollback()
                throw new AppError(e.message, e.status);
            }
        });
    }
}