const router = require('express').Router();
const PasswordUserOldController = require('../../controllers/PasswordUserOld/PasswordUserOldController');

router.post('/create', new PasswordUserOldController().create);
router.get('/findAll', new PasswordUserOldController().findAll);
router.get('/findOne/:user_id', new PasswordUserOldController().findOne);

module.exports = router;
