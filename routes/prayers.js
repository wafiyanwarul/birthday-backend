const express = require('express');
const router = express.Router();
const Prayer = require('../models/prayer');

// POST: Tambah doa baru
router.post('/', async (req, res) => {
  try {
    const { prayer_text } = req.body;
    
    // Validasi
    if (!prayer_text || prayer_text.length < 50) {
      return res.status(400).json({
        status: 'error',
        message: 'Doa harus minimal 50 karakter'
      });
    }

    const result = await Prayer.create(prayer_text);
    
    res.status(201).json({
      status: 'success',
      message: 'Doa berhasil disimpan',
      data: result
    });
  } catch (error) {
    console.error('Error in POST /prayers:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat menyimpan doa'
    });
  }
});

// GET: Ambil semua doa
router.get('/', async (req, res) => {
  try {
    const prayers = await Prayer.getAll();
    res.json({
      status: 'success',
      data: prayers
    });
  } catch (error) {
    console.error('Error in GET /prayers:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil data doa'
    });
  }
});

module.exports = router;