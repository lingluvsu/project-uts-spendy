import * as SQLite from 'expo-sqlite';

// PERBAIKAN: Gunakan openDatabaseSync (API Modern untuk Expo SDK 50+)
const db = SQLite.openDatabaseSync('spendy.db');

export const initDatabase = () => {
  // API baru menggunakan execSync yang lebih simpel
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL, -- 'income' atau 'expense'
        description TEXT,
        date TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );
    `);
    return Promise.resolve(true);
  } catch (error) {
    console.error("Error initializing database:", error);
    return Promise.reject(error);
  }
};

export const getDbConnection = () => db;