const db = require('../db')

class Patient {
    constructor(id, name, diagnose) {
        this.id = id
        this.name = name
        this.diagnose = diagnose
    }

    static findAll() {
        let query = `SELECT * FROM Patients`
        return new Promise ((resolve, reject) => {
            db.all(query, function(err, data) {
                if(err) {
                    reject(err)
                } else {
                    let newData = []
                    for(let i = 0; i < data.length; i++) {
                        let patient = new Patient(null, data[i].name, data[i].diagnose)
                        newData.push(patient)
                    }
                    resolve(newData)
                }
            })
        })
    }

    create() {
        let query = `INSERT INTO Patients (name, diagnose)
        VALUES('${this.name}', '${this.diagnose}')`
        
        return new Promise((resolve, reject) => {
            db.run(query, function(err) {
                if(err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }
}

module.exports = Patient