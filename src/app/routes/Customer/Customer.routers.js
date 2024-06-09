const router = require('express').Router();
const CustomerController = require('../../controllers/Customer/CustomerController');
const {
  authenticateToken,
} = require('../../../../domain/auth/middlewares/MiddlewaresAuth');

router.post('/create', new CustomerController().create);

router.get('/findAll', new CustomerController().findAll);

router.get('/findOne/:id', new CustomerController().findOne);

router.put('/update', authenticateToken, new CustomerController().update);

router.delete('/delete/:id', new CustomerController().delete);

module.exports = router;
