const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

function createEmployees(){
  var create = `CREATE TABLE
                Employees
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 username TEXT,
                 password TEXT,
                 role TEXT);`
  db.run(create,function(err) {
    if (err) {
      console.log('ERROR Create Employees table!');
      console.log(err);
    }
    else {
      console.log('Employees table created!');
    }
  })
}

function createPatients(){
  var create = `CREATE TABLE
                Patients
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 name TEXT,
                 diagnose TEXT);`
  db.run(create,function(err) {
    if (err) {
      console.log('ERROR Create Patients table!');
      console.log(err);
    }
    else {
      console.log('Patients table created!');
    }
  })
}

function alterEmployees() {
  var create = `ALTER TABLE Employees
                ADD COLUMN isLogin INTEGER;`;
  db.run(create, function(err) {
    if (err) {
      console.log('ERROR Alter table!');
      console.log(err);
    }
    else{
      console.log('alter created!');
    }
  })
}
db.serialize(function(){
createEmployees();
createPatients();
alterEmployees();
})
