const router = require('express').Router();
const UserController = require('../../controllers/User/user.controller');
const {
  authenticateToken,
} = require('../../../../domain/auth/middlewares/MiddlewaresAuth');

router.post('/create', new UserController().create);

router.get('/findAll', new UserController().findAll);

router.get('/findOne', authenticateToken, new UserController().findOne);

router.put('/update/:id', new UserController().update);

router.delete('/delete/:id', new UserController().delete);

module.exports = router;
