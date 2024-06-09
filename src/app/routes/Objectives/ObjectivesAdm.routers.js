const router = require('express').Router();
const ObjectivesController = require('../../controllers/Objectives/ObjectivesController');
const {
  authenticateToken,
  checkPermission,
} = require('../../../../domain/auth/middlewares/MiddlewaresAuth');

const objectives = new ObjectivesController();

router.post(
  '/create',
  authenticateToken,
  checkPermission('create_permission', 'admin'),
  objectives.create,
);
router.get(
  '/findAll',
  authenticateToken,
  checkPermission('find_all_permission', 'admin'),
  objectives.findAll,
);
router.get(
  '/findOne/:id',
  authenticateToken,
  checkPermission('find_one_permission', 'admin'),
  objectives.findOne,
);
router.put(
  '/update/:id',
  authenticateToken,
  checkPermission('update_permission', 'admin'),
  objectives.update,
);
router.delete(
  '/delete/:id',
  authenticateToken,
  checkPermission('delete_permission', 'admin'),
  objectives.delete,
);

module.exports = router;
