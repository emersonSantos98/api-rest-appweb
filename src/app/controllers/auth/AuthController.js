const Authentication = require('../../../../domain/services/auth/AuthenticationServices')

class AuthController {

    constructor() {
        this.authentication = new Authentication();
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
        this.me = this.me.bind(this);
    }

    async login(req, res) {
        const { email, password } = req.body;
         const login = await this.authentication.login(email, password);
       return res.status(200).json(login);
    }


    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        const refresh = await this.authentication.refreshToken(refreshToken);
        return res.status(200).json(refresh);
    }

    async verifyToken(req, res) {
        const uerId = req.user;
        console.log(uerId)
        const verify = await this.authentication.verifyToken()
        return res.status(200).json(verify);
    }

    async me(req, res) {
        const userAuth = await this.authentication.me(req.user.userId)
        return res.status(200).json(userAuth);
    }

}

module.exports = AuthController;
