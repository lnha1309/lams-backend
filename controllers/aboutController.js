const AboutUs = require('../models/AboutUs');

const ok = (res, message, data = null) => res.json({ success: true, message, data });
const fail = (res, status, message) => res.status(status).json({ success: false, message, data: null });

exports.getAbout = async (req, res) => {
  try {
    const about = await AboutUs.findOne({ status: 'published' });
    if (!about) return fail(res, 404, 'About data not found');
    return ok(res, 'About fetched successfully', about);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.getAdminAbout = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = await AboutUs.create({
        intro: { label: '', title: '', content: '' },
        features: [],
        quoteBanner: { quoteText: '', author: '', backgroundImage: '' },
        variety: { label: '', title: '', content: '', images: [], ctaButton: { text: '', link: '' } },
        howItWorks: { label: '', title: '', image: '', steps: [] },
        categories: { features: [], images: [] },
        subscribe: { title: '', description: '' },
        seo: { metaTitle: '', metaDescription: '', metaKeywords: '', ogImage: '' },
        status: 'draft',
        lastModified: new Date()
      });
    }
    return res.render('admin/about', { title: 'About Us', about });
  } catch (err) {
    return res.status(500).send(err.message || 'Server error');
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const data = req.body || {};

    const about = await AboutUs.findOneAndUpdate(
      {},
      { $set: { ...data, lastModified: new Date() } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return ok(res, 'About updated successfully', about);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.publishAbout = async (req, res) => {
  try {
    const about = await AboutUs.findOneAndUpdate(
      {},
      { $set: { status: 'published', lastModified: new Date() } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return ok(res, 'About published successfully', about);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};
