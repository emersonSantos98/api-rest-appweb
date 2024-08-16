const router = require('express').Router();
const AuthController = require('../../controllers/auth/AuthController');

const {
  authenticateToken,
} = require('../../../../domain/auth/middlewares/MiddlewaresAuth');
const authController = new AuthController();

router.post('/login', authController.login);

router.post('/refreshToken', authController.refreshToken);

router.get('/verifyToken', authenticateToken, authController.verifyToken);

router.get('/me', authenticateToken, authController.me);

module.exports = router;
