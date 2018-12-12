const db = require('../Models/dbConnection')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static findAll() {
    
    return new Promise ( (resolve, reject) => {
      let query = `
        SELECT * FROM Patients
      `
  
      db.all(query, function (err, rows) {
        if (err) {
         reject(err) 
        } else {
          let patientData = []
          if (rows) {
            rows.forEach( a => {
              let id = a.id
              let name = a.name
              let diagnosis = a.diagnosis
              patientData.push(new Patient(id, name, diagnosis))
            })
          
            resolve(patientData)
          }
        }
      })
    })
  }

  static create(input) {

    return new Promise( (resolve, reject) => {
      let query = `
        INSERT INTO Patients (name, diagnosis)
        VALUES ("${input[0]}", "${input[1]}")
      `
      
      db.run(query, function (err) {
        if (err) {
          reject(err)
        } else {
          let obj = new Patient(this.lastID, input[0], input[1])
          resolve(obj) //create berhasil
        }
      })
    })
  }
}

module.exports = Patient

// Patient.create(["maman","sakit tapi tidak berdarah"])
//   .then( output => {
//     console.log(output)
//   })
//   .catch( err => {
//     console.log(err)
//   })