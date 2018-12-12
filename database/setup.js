const db = require('./connection.js')

db.serialize(function() {
  const qEmployee = `
                      CREATE TABLE IF NOT EXISTS Employees (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(100),
                        username VARCHAR(15),
                        password VARCHAR(15),
                        role VARCHAR(20)
                      );
                     `
   db.run(qEmployee, (err) => {
       if (err) {
           console.log(err)
       } else {
           console.log('Employees Table Added')
       }
   })

   const qPatient = `
                     CREATE TABLE IF NOT EXISTS Patients (
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name VARCHAR(100),
                     diagnosis TEXT
                     );
                     `
   db.run(qPatient, (err) => {
       if (err) {
           console.log(err)
       } else {
           console.log('Patient Table Added')
       }
   })
});

function alterTable() {
   const qAlterTable = `
                       ALTER TABLE Employees
                       ADD COLUMN isLogin INTEGER;
                       `
   db.run(qAlterTable, (err) => {
       if (err) {
           console.log(err)
       }
   })
}

alterTable()
