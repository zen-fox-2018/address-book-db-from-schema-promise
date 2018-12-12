const db = require('../database/connection.js');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static insertData(name, diagnosis) {
    return new Promise((resolve, reject) => {
      let query = 
      `INSERT INTO patients (name, diagnosis)
       VALUES ("${name}", "${diagnosis}");`;
      db.run(query, (err) => {
        if (err) {
          reject(err);
        } else {
          let newPatient = new Patient(name, diagnosis)
          resolve();
        }
      })
    })
  }

  static countAll() {
    return new Promise((resolve, reject) => {
      let query =
      `SELECT COUNT(*) AS count from patients;`;
      db.get(query, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count.count);
        }
      })
    })
  }

  static findOneBy(condition, value) {
    return new Promise((resolve, reject) => {
      let query =
      `SELECT * FROM patients
       WHERE ${condition} = "${value}";`
       db.get(query, (err, data) => {
         if (err) {
           reject(err);
         } else {
           resolve(data);
         }
       })
    })
  }
}

module.exports = Patient;
