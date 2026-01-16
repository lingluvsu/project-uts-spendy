const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// koneksi DB (PAKAI DATABASE LAMA LU)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan kalau ada
  database: 'uas_keuangan'
});

db.connect(err => {
  if (err) {
    console.error('DB error:', err);
    return;
  }
  console.log('MySQL connected');
});

// test root
app.get('/', (req, res) => {
  res.send('API jalan');
});


// =======================
// GET semua pengeluaran
// =======================
app.get('/pengeluaran', (req, res) => {
  const sql = 'SELECT * FROM pengeluaran';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }

    res.json({
      success: true,
      message: 'Data pengeluaran berhasil diambil',
      data: results
    });
  });
});


// =======================
// POST tambah pengeluaran
// =======================
app.post('/pengeluaran', (req, res) => {
  const { kategori, deskripsi, jumlah } = req.body;

  if (!kategori || !jumlah) {
    return res.status(400).json({
      success: false,
      message: 'kategori dan jumlah wajib diisi'
    });
  }

  const sql =
    'INSERT INTO pengeluaran (kategori, deskripsi, jumlah) VALUES (?, ?, ?)';

  db.query(sql, [kategori, deskripsi || null, jumlah], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }

    res.json({
      success: true,
      message: 'Data berhasil ditambahkan',
      id: result.insertId
    });
  });
});


// =======================
// PUT update pengeluaran
// =======================
app.put('/pengeluaran/:id', (req, res) => {
  const { id } = req.params;
  const { kategori, deskripsi, jumlah } = req.body;

  const sql =
    'UPDATE pengeluaran SET kategori=?, deskripsi=?, jumlah=? WHERE id=?';

  db.query(sql, [kategori, deskripsi || null, jumlah, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }

    res.json({
      success: true,
      message: 'Data berhasil diupdate'
    });
  });
});


// =======================
// DELETE pengeluaran
// =======================
app.delete('/pengeluaran/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM pengeluaran WHERE id=?';

  db.query(sql, [id], err => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }

    res.json({
      success: true,
      message: 'Data berhasil dihapus'
    });
  });
});


// server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
