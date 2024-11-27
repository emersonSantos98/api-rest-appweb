// scraping.route.js
const router = require('express').Router();
const EcommerceController = require('../controllers/scraping.controller');
const ecommerceController = new EcommerceController();

router.post('/create', ecommerceController.createEcommerce);
router.put('/update/:id', ecommerceController.updateEcommerce);
router.get('/', ecommerceController.findAllEcommerces);
router.get('/:id', ecommerceController.findOneEcommerce);
router.delete('/:id', ecommerceController.deleteEcommerce);

module.exports = router;
