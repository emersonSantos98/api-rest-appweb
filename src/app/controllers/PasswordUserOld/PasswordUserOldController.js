const PasswordUserOldService = require('../../../../domain/services/PasswordUserOld/PasswordUserOldServices');

class PasswordUserOldController {
    constructor() {
        this.passwordUserOldService = new PasswordUserOldService();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
    }

    async create(request, response) {
        const {
            password_old,
            user_id
        } = request.body;
        const passwordOld = await this.passwordUserOldService.create({
            password_old,
            user_id,
        });
        return response.status(201).json(passwordOld);
    }

    async findAll(request, response) {
        const passwordsOld = await this.passwordUserOldService.findAll();
        response.status(200).json(passwordsOld);
    }

    async findOne(request, response) {
        const { user_id } = request.params;
        const passwordsOld = await this.passwordUserOldService.findOne(user_id);
        return response.status(200).json(passwordsOld);
    }


}

module.exports = PasswordUserOldController;
