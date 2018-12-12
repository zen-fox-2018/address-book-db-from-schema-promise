const db = require('../database/connection.js')

class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }

  static countAllPatient() {
    return new Promise((resolve, reject) => {
      const query = `
                    SELECT COUNT(*) AS countData
                    FROM Patients;
                    `
      db.get(query, function (err, countPatient) {
        if (!err) {
          resolve(countPatient)
        } else {
          reject(err)
        }
      })
    })
  }

  static findAllPatient() {
    return new Promise((resolve, reject) => {
      const query = `
                    SELECT *
                    FROM Patients;
                    `
      db.all(query, function(err, rows) {
        if (!err) {
          let newData = []
          for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            newData.push(new Patient(row.name, row.diagnosis))
          }
          resolve(newData)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static registerPatient(name, diagnosis) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO "Patient" (name, diagnosis)
              VALUES (
              "${name}",
              "${diagnosis}",
              );`, function (err, registeredData) {
        if (!err) {
          resolve(registeredData)
        } else {
          reject(err)
        }
      })
    })
  }

  static findOne(column, value) {
    return new Promise((resolve, reject) => {
      const qFindOne = `
                       SELECT *
                       FROM Patient
                       WHERE Patient.${column} = "${value}";
                       `
       db.get(qFindOne, function (err, specificData) {
         if (!err) {
           resolve(specificData)
         } else {
           reject(err)
         }
       })
    })
  }

  static removeData(id) {
    return new Promise((resolve, reject) => {
      const deleteQuery = `
                          DELETE FROM Patient
                          WHERE Patient.id = ${id};
                          `
      db.run(deleteQuery, (err, dataRemoved) => {
        if (!err) {
          resolve(dataRemoved)
        } else {
          reject(err)
        }
      })
    })
  }

  static updateFile(id, val, field) {
    return new Promise((resolve, reject) => {
      const query = `
                    UPDATE Patient
                    SET ${field} = ${val}
                    WHERE id = ${id};
                    `
                  // console.log(query)
      db.run(query, (err) => {
        if (!err) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }

  static employeeLoginCheck(column, value) {
    return new Promise((resolve, reject) => {
      const qFindOne = `
                       SELECT *
                       FROM Employees
                       WHERE ${column} = "${value}";
                       `
       db.all(qFindOne, function (err, specificData) {
         if (!err) {
           resolve(specificData)
         } else {
           reject(err)
         }
       })
    })
  }
}

// Patient.employeeLoginCheck('isLogin', 0)
// .then(function(data) {
//   console.log(data)
// })
// .catch(function(err) {
//   console.log(err)
// })


module.exports = Patient
