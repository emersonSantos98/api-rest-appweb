const CodeService = require('../../../../domain/services/User/CodeServices')

class CodeController {

    constructor() {
        this.codeService = new CodeService();
        this.validationCode = this.validationCode.bind(this);
        this.createCode = this.createCode.bind(this);

    }

    async validationCode(req, res) {
        const { code, user_id, type} = req.body;
        const validarCode = await this.codeService.validationCode({code, user_id,type});
        return res.status(200).json(validarCode);
    }
    async createCode(req, res) {
        const { code, user_id } = req.body;
        const createCode = await this.codeService.createCode({code, user_id});
        return res.status(200).json(createCode);
    }


}

module.exports = CodeController;
