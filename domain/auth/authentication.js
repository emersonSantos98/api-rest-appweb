const jwtConfig = require('../../config/jwtConfig');
const jwt = require('jsonwebtoken');
const {AppError} = require('../../src/error/Errors');


class Authentication {

    constructor() {
        this.secretKey = jwtConfig.jwtConfig.secret;
        this.refreshSecretKey = jwtConfig.jwtConfig.refreshTokenSecret;
        this.expiresIn = jwtConfig.jwtConfig.expiresIn;
        this.refreshExpiresIn = jwtConfig.jwtConfig.refreshTokenExpiresIn;
    }


    async generateToken(payload) {
        const accessToken = jwt.sign(payload, this.secretKey, {
            algorithm: 'HS256',
            expiresIn: this.expiresIn
        });
        const refreshToken = jwt.sign(payload, this.refreshSecretKey, {
            algorithm: 'HS256',
            expiresIn: this.refreshExpiresIn
        });

        return {accessToken, refreshToken};
    }

    async generateRefreshToken(payload) {
        return new Promise((resolve, reject) => {
           try {
               jwt.verify(payload, this.refreshSecretKey);
               const decoded = jwt.decode(payload);
               const newPayload = {
                   id: decoded.id,
                   email: decoded.email,
               }
               const accessToken = jwt.sign(newPayload, this.secretKey, { expiresIn: this.expiresIn, algorithm: 'HS256' });
               const newRefreshToken = jwt.sign(newPayload, this.refreshSecretKey, { expiresIn: this.refreshExpiresIn, algorithm: 'HS256' });
               resolve({accessToken, refreshToken: newRefreshToken});
           } catch (error) {
                reject(new AppError('Invalid refresh token', 401));
           }
        });
    }


}

module.exports = Authentication;
