const db = require ('../database/db.js')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  
  
  static findWhere (field, value) {
    let query = `
                SELECT * FROM Patients
                WHERE "${value}" = Patients.${field}
    `
        return new Promise (function (resolve,reject){
            db.get(query, function(err, data) {
                if(err) {
                    reject(err)
                }else {
                    if(data !== undefined){
                        let obj = new Patient (data.id, data.name, data.diagnosis)

                        resolve(obj)
                    }else{
                        resolve(data)
                    }
                }
            })
        })
    }

    static create (name, diagnosis, doctorId) {
        let query = `
                    INSERT INTO Patients
                    (name, diagnosis, doctorId)
                    VALUES
                    ("${name}", "${diagnosis}", ${Number(doctorId)})
        `

        return new Promise (function (resolve, reject) {
            db.run(query, function(err) {
                if(err) {
                    reject (err)
                }else {
                    let obj = new Patient (this.lastID, name, diagnosis)
                    resolve(obj)
                }
            })
        })
    }

    static update (field, value, id) {
        let query = `
                    UPDATE Patients
                    SET ${field} = "${value}"
                    WHERE Patients.id = ${Number(id)}
        `
        return new Promise (function(resolve, reject) {
            db.run (query, function(err) {
                if (err) {
                    reject(err)
                }else {
                    resolve()
                }
            })
        })
    }
  


}

module.exports = Patient;


