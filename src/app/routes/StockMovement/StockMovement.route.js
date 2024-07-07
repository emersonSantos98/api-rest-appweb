// StockMovement.route.js
const router = require('express').Router();
const StockMovementController = require('../../controllers/StockMovement/StockMovement.controller');
const stockmovementController = new StockMovementController();
// Define your routes here

router.post('/create', stockmovementController.createStockMovement);
router.get('/findAll', stockmovementController.findAllStockMovements);
router.get('/findOne', stockmovementController.findOneStockMovement);
router.put('/update/:id', stockmovementController.updateStockMovement);
router.delete('/delete/:id', stockmovementController.deleteStockMovement);
router.post('/addStock', stockmovementController.addStock);
router.post('/reduceStock', stockmovementController.reduceStock);

module.exports = router;
