const router = require('express').Router();
const multer = require('multer');
const maxSize = 50 * 1024 * 1024; // 50MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: maxSize,
    },
});
const TemplateFunnelsController = require('../../../controllers/TemplatesFunnels/admin/templateFunnels.controller');
const controller = TemplateFunnelsController;




router.post('/create', upload.single('thumb'), controller.createTemplate);
router.get('/findAll', controller.findAllTemplate);
router.get('/findOne/:id', controller.findOneTemplate);
router.put('/update/:id', upload.single('thumb'), controller.updateTemplate);
router.delete('/delete/:id', controller.deleteTemplate);

module.exports = router;
