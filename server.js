const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const prayersRoutes = require('./routes/prayers')

// Middleware
app.use(
  cors({
    origin: '*'
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/prayers', prayersRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kartika Birthday API' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server'
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`)
})

// Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Terhubung ke MongoDB Atlas');
}).catch((error) => {
  console.error('Koneksi ke MongoDB gagal:', error.message);
});
