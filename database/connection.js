var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/database.db');

module.exports = db