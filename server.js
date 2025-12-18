const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/database');

require('dotenv').config();

const app = express();

// Auto-create uploads folder
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// View Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/admin');

// Database Connection
connectDB();

// Routes
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
