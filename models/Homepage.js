const mongoose = require('mongoose');

const CtaButtonSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ['primary', 'secondary'], default: 'primary' }
  },
  { _id: false }
);

const HomepageSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, required: true, default: '' },
      subtitle: { type: String, default: '' },
      backgroundImage: { type: String, default: '' },
      ctaButtons: { type: [CtaButtonSchema], default: [] }
    },

    vmp: {
      // Vision / Mission / Philosophy (3 phần)
      vision: { title: { type: String, default: '' }, content: { type: String, default: '' } },
      mission: { title: { type: String, default: '' }, content: { type: String, default: '' } },
      philosophy: { title: { type: String, default: '' }, content: { type: String, default: '' } }
    },

    whoWeAre: {
      title: { type: String, default: '' },
      content: { type: String, default: '' }
    },

    whyChoose: {
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      image: { type: String, default: '' },
      features: { type: [String], default: [] }
    },

    accreditation: {
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      image: { type: String, default: '' },
      stats: {
        internationalLearners: { type: Number, default: 0 },
        averageTuitionSavings: { type: Number, default: 0 }
      }
    },

    featuredNews: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'NewsEvent' }
    ],

    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      metaKeywords: { type: String, default: '' },
      ogImage: { type: String, default: '' }
    },

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },

    lastModified: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Homepage', HomepageSchema);
