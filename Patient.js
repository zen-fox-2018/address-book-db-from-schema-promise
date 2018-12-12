const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Patient {
  constructor(input) {
    this.id = input.id
    this.name = input.name
    this.diagnosis = input.diagnosis
  }

  static findAll() {
    let query =
    `
      SELECT * FROM Patients;
    `

    let promise = new Promise(function(resolve, reject) {
      db.all(query, function(err, rows) {
        if (err) {
          reject(err)
        }
        else {
          resolve(rows)
        }
      })
    })
    return promise
  }

  static findOne(obj) {
    let field = obj.field
    let value = obj.value

    let query =
    `
      SELECT * FROM Patients
      WHERE ${field} = ${value};
    `

    let promise = new Promise(function(resolve, reject) {
      db.get(query, function(err, row) {
        if (err) {
          reject(err)
        }
        else {
          if (!row) {
            resolve({})
          }
          else {
            let data = new Patient(row)
            resolve(data)
          }
        }
      })
    })
    return promise
  }

  save() {

    const input = Object.values(this).filter(function(element) {
      return element
    })

    let query =
    `
      INSERT INTO Patients
      (name, diagnosis)
      VALUES
      (?, ?);
    `

    let promise = new Promise(function(resolve, reject) {
      db.run(query, input, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(this)
        }
      })
    })
    return promise
  }

  update(obj) {
    let query =
    `
      UPDATE Patients
      SET ${obj.field} = ${obj.value}
      WHERE id = ${this.id};
    `

    let promise = new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(this)
        }
      })
    })
    return promise
  }
}

module.exports = Patient