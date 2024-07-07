// ProductVariation.route.js
const router = require('express').Router();
const ProductVariationController = require('../../controllers/ProductVariation/ProductVariation.controller');
const productvariationController = new ProductVariationController();
// Define your routes here

router.post('/create', productvariationController.createProductVariation);
router.get('/findAll', productvariationController.findAllProductVariations);
router.get('/findOne', productvariationController.findOneProductVariation);
router.put('/update/:id', productvariationController.updateProductVariation);
router.delete('/delete/:id', productvariationController.deleteProductVariation);

module.exports = router;
