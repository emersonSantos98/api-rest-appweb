const router = require('express').Router();
const PermissionUserGroupController = require('../../controllers/PermissionUserGroup/PermissionUserGroupController');

router.post('/create', new PermissionUserGroupController().create);
router.get('/findAll', new PermissionUserGroupController().findAll);
router.get('/findOne/:id', new PermissionUserGroupController().findOne);
router.put('/update/:id', new PermissionUserGroupController().update);
router.delete('/delete/:id', new PermissionUserGroupController().delete);

module.exports = router;
