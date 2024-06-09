const router = require('express').Router();
const LanguagesController = require('../../controllers/Languages/LanguagesController');

router.post('/create', new LanguagesController().create);
router.get('/findAll', new LanguagesController().findAll);
router.get('/findOne/:id', new LanguagesController().findOne);
router.put('/update/:id', new LanguagesController().update);
router.delete('/delete/:id', new LanguagesController().delete);

module.exports = router;
