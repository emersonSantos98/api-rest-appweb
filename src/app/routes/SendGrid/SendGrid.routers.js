const router = require('express').Router();
const SendGridController = require('../../controllers/SendGrid/SendGridController');

router.post('/send', new SendGridController().send);

module.exports = router;
