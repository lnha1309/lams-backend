const NewsEvent = require('../models/NewsEvent');

const ok = (res, message, data = null) => res.json({ success: true, message, data });
const fail = (res, status, message) => res.status(status).json({ success: false, message, data: null });

exports.getNewsList = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
    const category = req.query.category;

    const filter = { status: 'published' };
    if (category) filter.category = category;

    const total = await NewsEvent.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const news = await NewsEvent.find(filter)
      .sort({ publishDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return ok(res, 'News list fetched successfully', {
      news,
      totalPages,
      currentPage: page,
      total
    });
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.getNewsDetail = async (req, res) => {
  try {
    const { slug } = req.params;

    const news = await NewsEvent.findOne({ slug, status: 'published' });
    if (!news) return fail(res, 404, 'News not found');

    // tăng views
    news.views = (news.views || 0) + 1;
    await news.save();

    return ok(res, 'News detail fetched successfully', news);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

// Admin views
exports.getAdminNewsList = async (req, res) => {
  try {
    const news = await NewsEvent.find().sort({ createdAt: -1 });
    return res.render('admin/news-list', { title: 'News & Events', news });
  } catch (err) {
    return res.status(500).send(err.message || 'Server error');
  }
};

exports.getNewsForm = async (req, res) => {
  try {
    const { id } = req.params;
    let item = null;

    if (id) item = await NewsEvent.findById(id);
    return res.render('admin/news-form', { title: id ? 'Edit News' : 'Create News', item });
  } catch (err) {
    return res.status(500).send(err.message || 'Server error');
  }
};

// Admin actions
exports.createNews = async (req, res) => {
  try {
    const data = req.body || {};

    // validate required theo model: title + featuredImage :contentReference[oaicite:6]{index=6}
    if (!data.title || !data.title.trim()) return fail(res, 400, 'Title is required');
    if (!data.featuredImage || !data.featuredImage.trim()) return fail(res, 400, 'Featured image is required');

    const created = await NewsEvent.create({
      ...data,
      lastModified: new Date()
    });

    return ok(res, 'News created successfully', created);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body || {};

    if (data.title !== undefined && !String(data.title).trim()) return fail(res, 400, 'Title is required');
    if (data.featuredImage !== undefined && !String(data.featuredImage).trim()) return fail(res, 400, 'Featured image is required');

    const updated = await NewsEvent.findByIdAndUpdate(
      id,
      { $set: { ...data, lastModified: new Date() } },
      { new: true }
    );

    if (!updated) return fail(res, 404, 'News not found');
    return ok(res, 'News updated successfully', updated);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await NewsEvent.findByIdAndDelete(id);
    if (!deleted) return fail(res, 404, 'News not found');
    return ok(res, 'News deleted successfully', { id });
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};
