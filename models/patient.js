const db = require('../db/connection');

class Patient {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.diagnosis = obj.diagnosis;
  }

  static createPatient(data) {
    let patient = [data[0], data.slice(1).join(' ,')];
    const query = `
    INSERT INTO
    patients (name, diagnose)
    VALUES
    (?, ?);
    `;
    return new Promise((resolve, reject) => {
      db.run(query, patient, (errRun) => {
        if (errRun) {
          reject(errRun);
        } else {
          resolve();
        }
      })
    })
  }

  static listPatients() {
    const query = `
      SELECT
        *
      FROM
        patients
    `
    return new Promise((resolve, reject) => {
      db.all(query, (err, patients) => {
        if (err) {
          reject(err);
        } else {
          resolve(patients);
        }
      })
    })
  }
}

module.exports = Patient;
