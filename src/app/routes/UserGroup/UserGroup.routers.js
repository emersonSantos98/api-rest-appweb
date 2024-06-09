const router = require('express').Router();
const UserGroupController = require('../../controllers/UserGroup/UserGroupController');

router.post('/create', new UserGroupController().create);

router.get('/findAll', new UserGroupController().findAll);

router.get('/findOne/:id', new UserGroupController().findOne);

router.put('/update/:id', new UserGroupController().update);

router.delete('/delete/:id', new UserGroupController().delete);

module.exports = router;
