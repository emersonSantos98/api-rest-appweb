const FindAllUniqueSubjectsService = require('../../../../domain/services/Permission/FindAllUniqueSubjects.service');

module.exports = class FindAllUniqueSubjectsController {
    constructor() {
        this.service = new FindAllUniqueSubjectsService();
        this.handle = this.handle.bind(this);
    }
    async handle(req, res) {
        const response = await this.service.execute();
        return res.status(200).json(response);
    }
}