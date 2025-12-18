const router = require('express').Router();
const upload = require('../middleware/upload');
const uploadController = require('../controllers/uploadController');

// single image
router.post(
  '/image',
  upload.single('image'),
  uploadController.uploadSingle
);

// multiple images (max 10)
router.post(
  '/images',
  upload.array('images', 10),
  uploadController.uploadMultiple
);

// error handler for multer
router.use((err, req, res, next) => {
  uploadController.handleUploadError(err, req, res, next);
});

module.exports = router;
