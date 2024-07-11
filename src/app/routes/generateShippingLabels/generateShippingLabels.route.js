// generateShippingLabels.route.js
const router = require('express').Router();
const generateShippingLabelsController = require('../../controllers/generateShippingLabels/generateShippingLabels.controller');
const multer = require('multer');
const generateshippinglabelsController = new generateShippingLabelsController();
// Define your routes here
const maxSize = 700 * 1024 * 1024; // 700MB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSize,
  },
});

router.post(
  '/create',
  upload.single('file'),
  generateshippinglabelsController.creategenerateShippingLabels,
);

module.exports = router;
