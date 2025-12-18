const Homepage = require('../models/Homepage');

const ok = (res, message, data = null) => res.json({ success: true, message, data });
const fail = (res, status, message) => res.status(status).json({ success: false, message, data: null });

exports.getHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOne({ status: 'published' }).populate('featuredNews');
    if (!homepage) return fail(res, 404, 'Homepage not found');
    return ok(res, 'Homepage fetched successfully', homepage);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.getAdminHomepage = async (req, res) => {
  try {
    const NewsEvent = require('../models/NewsEvent');

    let homepage = await Homepage.findOne().populate('featuredNews'); // singleton
    if (!homepage) {
      homepage = await Homepage.create({
        hero: { title: 'Welcome to LAMS', subtitle: '', backgroundImage: '', ctaButtons: [] },
        vmp: {
          vision: { title: '', content: '' },
          mission: { title: '', content: '' },
          philosophy: { title: '', content: '' }
        },
        whoWeAre: { title: '', content: '' },
        whyChoose: { title: '', content: '', image: '', features: [] },
        accreditation: { title: '', content: '', image: '', stats: { internationalLearners: 0, averageTuitionSavings: 0 } },
        featuredNews: [],
        seo: { metaTitle: '', metaDescription: '', metaKeywords: '', ogImage: '' },
        status: 'draft',
        lastModified: new Date()
      });
    }

    // Get all published news for selection
    const newsList = await NewsEvent.find({ status: 'published' }).sort({ createdAt: -1 });

    return res.render('admin/homepage', { title: 'Homepage', homepage, newsList });
  } catch (err) {
    return res.status(500).send(err.message || 'Server error');
  }
};

exports.updateHomepage = async (req, res) => {
  try {
    const data = req.body || {};

    // validate tối thiểu: hero.title 
    if (data.hero && typeof data.hero.title === 'string' && data.hero.title.trim() === '') {
      return fail(res, 400, 'Hero title is required');
    }

    const homepage = await Homepage.findOneAndUpdate(
      {},
      { $set: { ...data, lastModified: new Date() } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return ok(res, 'Homepage updated successfully', homepage);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.publishHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOneAndUpdate(
      {},
      { $set: { status: 'published', lastModified: new Date() } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return ok(res, 'Homepage published successfully', homepage);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};
