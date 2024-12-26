const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const prayersRoutes = require('./routes/prayers')

// Middleware
app.use(
  cors({
    origin: 'wishtrack-io.up.railway.app', // Ganti dengan URL frontend Anda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
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
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`)
})
