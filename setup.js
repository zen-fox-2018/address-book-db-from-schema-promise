const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function() {
  let queryEmployee =
  `
    CREATE TABLE Employees
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(30) UNIQUE,
      password VARCHAR(30),
      role VARCHAR(30),
      isLogin BOOLEAN
    )
  `

  let queryPatient =
  `
    CREATE TABLE Patients
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30),
      diagnosis VARCHAR(255)
    )
  `

  db.run(queryEmployee, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`berhasil membuat tabel Employees`);
    }
  })

  db.run(queryPatient, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`berhasil membuat tabel Patients`);
    }
  })
})

db.close()