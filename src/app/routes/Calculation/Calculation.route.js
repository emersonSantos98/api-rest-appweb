// Calculation.route.js
const router = require('express').Router();
const CalculationController = require('../../controllers/Calculation/Calculation.controller');
const calculationController = new CalculationController();
// Define your routes here

router.post('/create', calculationController.createCalculation);
router.get('/findAll', calculationController.findAllCalculations);
router.get('/findOne', calculationController.findOneCalculation);
router.put('/update/:id', calculationController.updateCalculation);
router.delete('/delete/:id', calculationController.deleteCalculation);

module.exports = router;
