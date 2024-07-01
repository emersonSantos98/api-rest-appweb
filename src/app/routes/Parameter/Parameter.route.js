// Parameter.route.js
const router = require('express').Router();
const ParameterController = require('../../controllers/Parameter/Parameter.controller');
const parameterController = new ParameterController();
// Define your routes here

router.post('/create', parameterController.createParameter);
router.get('/findAll', parameterController.findAllParameters);
router.get('/findOne', parameterController.findOneParameter);
router.put('/update/:id', parameterController.updateParameter);
router.delete('/delete/:id', parameterController.deleteParameter);

module.exports = router;
