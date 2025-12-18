# LAMS CMS - Content Management System

A complete Content Management System (CMS) for managing the London Academy of Management and Sciences (LAMS) website content.

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **View Engine**: EJS with express-ejs-layouts
- **File Upload**: Multer
- **UI Framework**: Bootstrap 5

## Features

- ✅ Homepage content management
- ✅ About Us page management
- ✅ News & Events CRUD operations
- ✅ Contact information management
- ✅ Image upload (single & multiple)
- ✅ Draft/Published status for all pages
- ✅ SEO meta tags management
- ✅ RESTful API for frontend integration

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd lams-cms
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your MongoDB connection string and secrets.

5. Start the development server:
```bash
npm run dev
```

6. Access the CMS at: `http://localhost:5000/admin`

## Project Structure

```
lams-cms/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Homepage.js          # Homepage content model
│   ├── AboutUs.js           # About Us content model
│   ├── NewsEvent.js         # News & Events model
│   └── Contact.js           # Contact information model
├── controllers/
│   ├── homepageController.js
│   ├── aboutController.js
│   ├── newsController.js
│   ├── contactController.js
│   └── uploadController.js
├── routes/
│   ├── api.js               # Public API routes
│   ├── admin.js             # Admin routes
│   └── upload.js            # Upload routes
├── middleware/
│   └── upload.js            # Multer configuration
├── views/
│   ├── layouts/
│   │   └── admin.ejs        # Main layout
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── homepage.ejs
│   │   ├── about.ejs
│   │   ├── news-list.ejs
│   │   ├── news-form.ejs
│   │   └── contact.ejs
│   └── partials/
│       ├── header.ejs
│       ├── sidebar.ejs
│       └── footer.ejs
├── public/
│   └── uploads/             # Uploaded images
├── .env.example
├── package.json
├── server.js
└── README.md
```

## API Endpoints

### Public API (for frontend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/homepage` | Get published homepage data |
| GET | `/api/about` | Get published about data |
| GET | `/api/news` | Get news list (supports pagination) |
| GET | `/api/news/:slug` | Get news detail by slug |
| GET | `/api/contact` | Get published contact data |

#### Query Parameters for `/api/news`

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category (news, event, story, announcement)

### Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin` | Dashboard |
| GET | `/admin/homepage` | Homepage management |
| POST | `/admin/homepage/update` | Update homepage |
| POST | `/admin/homepage/publish` | Publish homepage |
| GET | `/admin/about` | About management |
| POST | `/admin/about/update` | Update about |
| POST | `/admin/about/publish` | Publish about |
| GET | `/admin/news` | News list |
| GET | `/admin/news/create` | Create news form |
| GET | `/admin/news/edit/:id` | Edit news form |
| POST | `/admin/news/create` | Create news |
| PUT | `/admin/news/update/:id` | Update news |
| DELETE | `/admin/news/delete/:id` | Delete news |
| GET | `/admin/contact` | Contact management |
| POST | `/admin/contact/update` | Update contact |
| POST | `/admin/contact/publish` | Publish contact |

### Upload Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload/image` | Upload single image |
| POST | `/upload/images` | Upload multiple images (max 10) |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT secret key | - |
| SESSION_SECRET | Session secret key | - |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## Frontend Integration

Add the following to your Next.js frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Example API call:
```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHomepageData() {
  const res = await fetch(`${API_URL}/homepage`);
  if (!res.ok) throw new Error('Failed to fetch homepage');
  const json = await res.json();
  return json.data;
}
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## License

ISC
