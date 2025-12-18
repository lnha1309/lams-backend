const Contact = require('../models/Contact');

const ok = (res, message, data = null) => res.json({ success: true, message, data });
const fail = (res, status, message) => res.status(status).json({ success: false, message, data: null });

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ status: 'published' });
    if (!contact) return fail(res, 404, 'Contact data not found');
    return ok(res, 'Contact fetched successfully', contact);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.getAdminContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();

    if (!contact) {
      contact = await Contact.create({
        mainCampus: { address: 'TBD', phone: '', email: '', mapUrl: '' },
        additionalOffices: [],
        socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '', youtube: '' },
        contactForm: {
          enabled: true,
          recipientEmail: '',
          autoReplyEnabled: false,
          autoReplyMessage: ''
        },
        businessHours: {
          weekdays: '',
          weekends: ''
        },
        status: 'draft',
        lastModified: new Date()
      });
    }

    return res.render('admin/contact', { title: 'Contact', contact });
  } catch (err) {
    return res.status(500).send(err.message || 'Server error');
  }
};

exports.updateContact = async (req, res) => {
  try {
    const data = req.body || {};

    // validate: mainCampus.address required
    if (data.mainCampus && typeof data.mainCampus.address === 'string' && !data.mainCampus.address.trim()) {
      return fail(res, 400, 'Main campus address is required');
    }

    const contact = await Contact.findOneAndUpdate(
      {},
      { $set: { ...data, lastModified: new Date() } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return ok(res, 'Contact updated successfully', contact);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};

exports.publishContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      {},
      { $set: { status: 'published', lastModified: new Date() } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return ok(res, 'Contact published successfully', contact);
  } catch (err) {
    return fail(res, 500, err.message || 'Server error');
  }
};
