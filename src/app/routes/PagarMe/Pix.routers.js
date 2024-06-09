const router = require('express').Router();
const CardController = require('../../controllers/PagarMe/PixController');

router.post('/create', new CardController().create);

module.exports = router;
