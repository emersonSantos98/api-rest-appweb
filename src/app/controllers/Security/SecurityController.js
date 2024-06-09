const SecurityService = require('../../../../domain/services/Security/SecurityService')

class SecurityController {

    constructor() {
        this.securityService = new SecurityService();
        this.changePassword = this.changePassword.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.twoFactorStatus = this.twoFactorStatus.bind(this);
    }

    async changePassword(req, res) {
        const { userId } = req.user
        const { passwordOld, newPassword , newPasswordConfirmation } = req.body;
        const alterarSenha = await this.securityService.changePassword({userId,passwordOld, newPassword , newPasswordConfirmation});
        return res.status(200).json(alterarSenha);
    }
    async forgotPassword(req, res) {
        const { email , type } = req.body
        const esqueciPassword = await this.securityService.forgotPassword(email,type);
        return res.status(200).json(esqueciPassword);
    }
    async resetPassword(req, res) {
        const { newPassword, newPasswordConfirmation , user_id } = req.body
        const esqueciPassword = await this.securityService.resetPassword(newPassword, newPasswordConfirmation,user_id);
        return res.status(200).json(esqueciPassword);
    }
    async twoFactorStatus(req, res) {
        const { two_factor,  user_id } = req.body
        const two_factor_status = await this.securityService.two_factor_status(two_factor, user_id);
        return res.status(200).json(two_factor_status);
    }


}

module.exports = SecurityController;
