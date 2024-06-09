const router = require('express').Router();
const CustomerController = require('../../controllers/PagarMe/CustomerController');

router.post('/create', new CustomerController().create);

module.exports = router;
