const db = require('../db')

class Patient {
    constructor(object) {
        this._id = object.id;
        this._name = object.name;
        this._diagnosis = object.diagnosis;
    }

    static execute(query , input) {
        return new Promise ((resolve, reject) => {
            db.run(query, input, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }

    create() {
        return new Promise ((resolve, reject) => {
            let query = `INSERT INTO Patients (name , diagnosis)
                    VALUES (?, ?)`
            let input = Object.values(this).filter(x => x !== undefined)
            Patient.execute(query, input)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    static countPatient() {
        return new Promise ((resolve, reject) => {
            let query = `SELECT COUNT(*) AS total FROM Patients`
            db.get(query, function(err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row.total)
                }
            })
        })
    }
}

module.exports = Patient