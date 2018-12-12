const db = require('./db/connection');
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS employees`);
  db.run(`DROP TABLE IF EXISTS patients`);
  // db.run(`DROP TABLE IF EXISTS diagnoses`);
  const qCreateTableEmployees = `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT,
      position TEXT
    );
  `;

  db.run(qCreateTableEmployees, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully create table employees`);
  });

  db.run(`ALTER TABLE 'employees' ADD COLUMN 	'isLogin'	INTEGER`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully add Column isLogin`);
    }
  })
  const qCreateTablePatients = `
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      diagnose TEXT
    );
  `;

  db.run(qCreateTablePatients, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully create table patients`);
  });

  // const qCreateTableDiagnoses = `
  //   CREATE TABLE IF NOT EXISTS diagnoses (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     diagnose TEXT,
  //     patientId INTEGER,
  //     FOREIGN KEY (patientId) REFERENCES patients(id)
  //   );
  // `;
  //
  // db.run(qCreateTableDiagnoses, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`Successfully create table diagnoses`);
  // });


})
