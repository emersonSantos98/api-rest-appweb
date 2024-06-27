// Product.route.js
const router = require('express').Router();
const multer = require('multer');
const ProductController = require('../../controllers/Product/Product.controller');
const productController = new ProductController();
const maxSize = 50 * 1024 * 1024; // 50MB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSize,
  },
});
const {
  authenticateToken,
  checkPermission,
} = require('../../../../domain/auth/middlewares/MiddlewaresAuth');
// Define your routes here

router.post(
  '/create',
  authenticateToken,
  upload.single('image'),
  authenticateToken,
  productController.createProduct,
);
router.get('/findAll', productController.findAllProducts);
router.get('/findOne', productController.findOneProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:productId', productController.deleteProduct);

module.exports = router;
