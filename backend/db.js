const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'uas_keuangan',
});

db.connect((err) => {
  if (err) {
    console.error('Database error:', err);
  } else {
    console.log('MySQL connected');
  }
});

module.exports = db;
