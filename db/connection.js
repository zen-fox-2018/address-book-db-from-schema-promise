const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/hospital.db');

module.exports = db;
