const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: '*', // or restrict to 'http://localhost:5173'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Serve uploaded files =====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Routes (only gallery for now) =====
const galleryRoutes = require('./routes/gallery.js');
app.use('/api/gallery', galleryRoutes);

// ===== Health Check =====
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ===== Root API =====
app.get('/api', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Kiran Wesley Photography</title>
        <style>
          body {
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: white;
            font-family: 'Segoe UI', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
          p { font-size: 1.2rem; color: #dcdcdc; }
        </style>
      </head>
      <body>
        <h1>📸 Welcome to the Backend</h1>
        <p>This is the API for <strong>Kiran Wesley Photography</strong></p>
        <p>Crafted with ❤️ using Express.js</p>
      </body>
    </html>
  `);
});

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
