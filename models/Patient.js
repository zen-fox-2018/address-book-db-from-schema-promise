const db = require('../database/connector')

class Patient {
    constructor(obj) {
      this.id = obj['id']
      this.name = obj['name']
      this.diagnosis = obj['diagnosis']
    }

    static findByAll() {
        return new Promise ((resolve, reject)=> {
            db.all(`SELECT * FROM patients;`,(err,rows)=>{
                if(err) reject(err)
                else {
                    let result = []
                    for(let i = 0; i < rows.length; i++){
                        result.push(new Patient(rows[i]))
                    }
                    resolve(result)
                }
            })
        })
    }

    static findById(id) { 
        return new Promise ((resolve, reject)=> {
            db.all(`SELECT * FROM patients
                WHERE id = ? ;`, id, (err, rows)=> {
                    if(err) reject(err)
                    else {
                        let result = []
                        result.push(new Patient(rows[0]))
                        resolve(result)
                    }
                })
        }) 
    }
    
    static CountPatient () {
        return new Promise((resolve, reject)=> {
            db.all(`SELECT COUNT(*) AS total FROM patients;`, (err,rows)=> {
                if(err) reject(err)
                else resolve(rows)
            })
        })
    }

    static insertPatient(name, diagnosis) {
        let statement = [name, diagnosis]
        return new Promise((resolve, reject)=> {
            db.run(`INSERT INTO patients VALUES(null, ? , ?)`, statement , (err)=> {
                if(err) reject(err)
                else resolve()
            })
        })
    }
  }
  
  module.exports = Patient