const router = require('express').Router();

const homepageController = require('../controllers/homepageController');
const aboutController = require('../controllers/aboutController');
const newsController = require('../controllers/newsController');
const contactController = require('../controllers/contactController');

const NewsEvent = require('../models/NewsEvent');
const Homepage = require('../models/Homepage');
const AboutUs = require('../models/AboutUs');
const Contact = require('../models/Contact');

// Dashboard
router.get('/', async (req, res) => {
  try {
    const totalNews = await NewsEvent.countDocuments();
    const publishedNews = await NewsEvent.countDocuments({ status: 'published' });
    const draftNews = await NewsEvent.countDocuments({ status: 'draft' });

    // Calculate total views
    const viewsResult = await NewsEvent.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalViews = viewsResult.length > 0 ? viewsResult[0].totalViews : 0;

    const homepage = await Homepage.findOne();
    const about = await AboutUs.findOne();
    const contact = await Contact.findOne();

    return res.render('admin/dashboard', {
      title: 'Dashboard',
      stats: {
        totalNews,
        publishedNews,
        draftNews,
        totalViews,
        homepageStatus: homepage?.status || 'N/A',
        aboutStatus: about?.status || 'N/A',
        contactStatus: contact?.status || 'N/A'
      }
    });
  } catch (err) {
    return res.status(500).send(err.message || 'Server error');
  }
});

// Homepage Management
router.get('/homepage', homepageController.getAdminHomepage);
router.post('/homepage/update', homepageController.updateHomepage);
router.post('/homepage/publish', homepageController.publishHomepage);

// About Management
router.get('/about', aboutController.getAdminAbout);
router.post('/about/update', aboutController.updateAbout);
router.post('/about/publish', aboutController.publishAbout);

// News Management
router.get('/news', newsController.getAdminNewsList);
router.get('/news/create', (req, res) => newsController.getNewsForm(req, res));
router.get('/news/edit/:id', (req, res) => newsController.getNewsForm(req, res));

router.post('/news/create', newsController.createNews);
router.put('/news/update/:id', newsController.updateNews);
router.delete('/news/delete/:id', newsController.deleteNews);

// Contact Management
router.get('/contact', contactController.getAdminContact);
router.post('/contact/update', contactController.updateContact);
router.post('/contact/publish', contactController.publishContact);

module.exports = router;
