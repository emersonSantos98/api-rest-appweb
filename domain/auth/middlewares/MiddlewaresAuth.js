const jwt = require('jsonwebtoken');
const jwtConfig = require('./../../../config/jwtConfig');

exports.verifyRefreshToken = (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ msg: "Acesso negado" });
    }

    try {
        jwt.verify(refreshToken, jwtConfig.jwtConfig.refreshTokenSecret);
        next();
    } catch (error) {
        res.status(403).json({ msg: "Token inválido!" });
    }
};


exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado" });
    }

    try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
            return res.status(403).json({ msg: "Token inválido!" });
        }

        const [header, payload, signature] = tokenParts;


        jwt.verify(token, jwtConfig.jwtConfig.secret, { algorithms: ['HS256'] });


        const decoded = jwt.decode(token);
        if (decoded.exp < Date.now() / 1000) {
            return res.status(403).json({ msg: "Token expirado!" });
        }

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch (error) {
        res.status(403).json({ msg: "Token inválido!" });
    }
};

function checkPermission(permission, allowedRoles) {
    return (req, res, next) => {
        const user = req.user;

        if (allowedRoles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({ msg: "Acesso negado" });
        }
    };
}



exports.checkPermission = checkPermission;
