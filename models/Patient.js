const db = require('../db')

class Patient {
  constructor(input) {
    this.id = input.id
    this.name = input.name
    this.diagnosis = input.diagnosis
  }
  static runQue(query, input) {
    return new Promise((res, rej) =>{
      db.run(query,input, function(err) {
        if(err) {
          rej(err)
        } else {
          let data = this
          res(data)
        }
      })
    })
  }

  save() {
    return new Promise ((res, rej) => {
      let query = `INSERT INTO patients (name, diagnosis)
      VALUES (?,?)
      `
      Patient.runQue(query, [this.name, this.diagnosis])
        .then(emp => {
          res(emp)
        })
        .catch(err => {
          rej(err)
        })
    })
  }
  delete(obj) {
    return new Promise((res, rej) => {
      let query = `DELETE FROM patients WHERE ${obj.where} = ?`

      Patient.runQue(query , [this[obj.where]])
        .then(emp => {
          res(emp)
        })
        .catch(err => {
          rej(err)
        })
    })
  }

  static findOne(obj) {
    return new Promise((res, rej) => {
      let query = `
        SELECT * FROM patients WHERE ${obj.where} = ?
      `
      db.get(query, [obj.value], (err,row) => {
        if(err) {
          rej(err)
        } else {
          if(row) {
            let newEmp = new Patient(row) 
            res(newEmp)
          } else {
            res(null)
          }
        }
      })
    })
  }
}
module.exports = Patient