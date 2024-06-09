const router = require('express').Router();
const CheckoutController = require('../../controllers/PagarMe/CheckoutController');

router.post('/create', new CheckoutController().create);

module.exports = router;
