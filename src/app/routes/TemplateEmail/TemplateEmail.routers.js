const router = require('express').Router();
const TemplateEmailController = require('../../controllers/TemplateEmail/TemplateEmailController');

router.post('/create', new TemplateEmailController().create);

router.get('/findAll', new TemplateEmailController().findAll);

router.get('/findOne/:id', new TemplateEmailController().findOne);

router.put('/update/:id', new TemplateEmailController().update);

router.delete('/delete/:id', new TemplateEmailController().delete);

module.exports = router;
