var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database/hospital.db')


// console.log(db);


module.exports = db
