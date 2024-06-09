const router = require('express').Router();
const FunnelsController = require('../../controllers/Funnels/FunnelsController');

router.post('/create', new FunnelsController().create);
router.get('/findAll', new FunnelsController().findAll);
router.get('/findOne/:id', new FunnelsController().findOne);
router.put('/update/:id', new FunnelsController().update);
router.delete('/delete/:id', new FunnelsController().delete);

module.exports = router;
