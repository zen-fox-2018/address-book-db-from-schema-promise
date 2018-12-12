const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./hospital.db')

class Patient {
  constructor(name, diagnose) {
    this.name = name;
    this.diagnose = diagnose;
  }

  static create(name, diagnose){
    var promise = new Promise (function(resolve, reject) {
      var createPatient = `INSERT INTO Patients
                        (name, diagnose)
                        VALUES
                        ("${name}", "${diagnose}");`;
      db.run(createPatient, function(errCreate, data) {
        if (errCreate) {
          reject(errCreate);
        }
        else {
          resolve(data);
        }
      })
    });
    return promise;
  }

  static findAll(){
    var promise = new Promise(function(resolve, reject) {
      var query = `SELECT *
                   FROM Patients;`;
      db.all(query, function(errFindAll, data) {
        if (errFindAll) {
          reject(errFindAll);
        }
        else {
          resolve(data);
        }
      })
    });
    // db.close();
    return promise;
  }
}


module.exports = Patient;
