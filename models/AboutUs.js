const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema(
  {
    intro: {
      label: { type: String, default: '' },
      title: { type: String, default: '' },
      content: { type: String, default: '' }
    },

    features: {
      type: [
        {
          number: { type: String, required: true }, // "01", "02", "03"
          title: { type: String, required: true },
          content: { type: String, required: true }
        }
      ],
      default: []
    },

    quoteBanner: {
      quoteText: { type: String, default: '' },
      author: { type: String, default: '' },
      backgroundImage: { type: String, default: '' }
    },

    variety: {
      label: { type: String, default: '' },
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      images: { type: [String], default: [] },
      ctaButton: {
        text: { type: String, default: '' },
        link: { type: String, default: '' }
      }
    },

    howItWorks: {
      label: { type: String, default: '' },
      title: { type: String, default: '' },
      image: { type: String, default: '' },
      steps: {
        type: [
          { icon: String, title: String, description: String }
        ],
        default: []
      }
    },

    categories: {
      features: {
        type: [
          { icon: String, title: String, description: String }
        ],
        default: []
      },
      images: { type: [String], default: [] }
    },

    subscribe: {
      title: { type: String, default: '' },
      description: { type: String, default: '' }
    },

    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      metaKeywords: { type: String, default: '' },
      ogImage: { type: String, default: '' }
    },

    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    lastModified: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AboutUs', AboutUsSchema);
