const router = require("express").Router();
const PermissionController = require("../../controllers/Permission/PermissionController");
const CreatePermissionDefaultsController = require("../../controllers/Permission/CreatePermissionDefaults.controller");
const FindAllUniqueSubjectsController = require("../../controllers/Permission/FindAllUniqueSubjects.controller");
const {authenticateToken, checkPermission} = require("../../../../domain/auth/middlewares/MiddlewaresAuth");
const permissionController = new PermissionController();

router.post("/create", authenticateToken, checkPermission('create_permission', 'admin'), permissionController.create);

router.get("/findAll", authenticateToken, checkPermission('find_all_permission', 'admin'), permissionController.findAll);

router.get("/findOne/:id", authenticateToken, checkPermission('find_one_permission', 'admin'), permissionController.findOne);

router.put("/update/:id", authenticateToken, checkPermission('update_permission', 'admin'), permissionController.update);

router.delete("/delete/:id", authenticateToken, checkPermission('delete_permission', 'admin'), permissionController.delete);

router.post('/createPermissionRole', authenticateToken, checkPermission('find_all_permission', 'admin'), new CreatePermissionDefaultsController().handle);

router.get('/findAllUniqueSubjects', authenticateToken, checkPermission('find_all_permission', 'admin'), new FindAllUniqueSubjectsController().handle);
module.exports = router;
