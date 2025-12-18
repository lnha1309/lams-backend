const mongoose = require('mongoose');

const NewsEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },

    featuredImage: { type: String, required: true }, // url/path ảnh
    teaser: { type: String, maxlength: 300, default: '' },
    content: { type: String, default: '' },

    category: {
      type: String,
      enum: ['news', 'event', 'story', 'announcement'],
      default: 'news'
    },
    tags: { type: [String], default: [] },

    author: {
      name: { type: String, default: '' },
      email: { type: String, default: '' }
    },

    publishDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    featured: { type: Boolean, default: false },

    views: { type: Number, default: 0 },

    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      metaKeywords: { type: String, default: '' },
      ogImage: { type: String, default: '' }
    },

    lastModified: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// auto-generate slug từ title
NewsEventSchema.pre('save', function () {
  if (!this.isModified('title')) return ;

  const slug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // remove special chars
    .replace(/\s+/g, '-')         // spaces -> dashes
    .replace(/-+/g, '-');         // remove duplicate -

  this.slug = slug;
});

module.exports = mongoose.model('NewsEvent', NewsEventSchema);
