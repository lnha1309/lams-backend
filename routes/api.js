const router = require('express').Router();

const homepageController = require('../controllers/homepageController');
const aboutController = require('../controllers/aboutController');
const newsController = require('../controllers/newsController');
const contactController = require('../controllers/contactController');

// Public API routes
router.get('/homepage', homepageController.getHomepage);
router.get('/about', aboutController.getAbout);

router.get('/news', newsController.getNewsList);
router.get('/news/:slug', newsController.getNewsDetail);

router.get('/contact', contactController.getContact);

module.exports = router;
