const CreatePermissionDefaultsService = require('../../../../domain/services/Permission/createPermissionDefaults.service');

module.exports = class CreatePermissionDefaultsController {
    constructor() {
        this.service = new CreatePermissionDefaultsService();
        this.handle = this.handle.bind(this);
    }
    async handle(req, res) {
        const response = await this.service.execute(req.body);
        return res.status(200).json(response);
    }
}