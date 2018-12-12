// const db = require('./connection.js');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./hospital.db');

function dbRun(query) {
  db.run(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('table created');
    }
  })
}
db.serialize(() => {
  let queryCreateEmployeeTable = 
  `CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(20),
    role VARCHAR(20)
  );`;

  let queryCreatePatientTable = 
  `CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    diagnosis TEXT
  );`;

  dbRun(queryCreateEmployeeTable);
  dbRun(queryCreatePatientTable);
})

function alterTable() {
  let query =
  `ALTER TABLE employees
   ADD COLUMN isLogin INTEGER;`
  dbRun(query);
}
// alterTable();