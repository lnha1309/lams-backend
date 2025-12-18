const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    mainCampus: {
      address: { type: String, required: true, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      mapUrl: { type: String, default: '' }
    },

    additionalOffices: {
      type: [
        {
          name: { type: String, default: '' },
          address: { type: String, default: '' },
          phone: { type: String, default: '' },
          email: { type: String, default: '' }
        }
      ],
      default: []
    },

    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' }
    },

    contactForm: {
      enabled: { type: Boolean, default: true },
      recipientEmail: { type: String, default: '' },
      autoReplyEnabled: { type: Boolean, default: false },
      autoReplyMessage: { type: String, default: '' }
    },

    businessHours: {
      weekdays: { type: String, default: '' },
      weekends: { type: String, default: '' }
    },

    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    lastModified: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
