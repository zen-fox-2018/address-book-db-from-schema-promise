const db = require('../db')

class Patient {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.diagnosis = obj.diagnosis
    }

    static findAll() {
        let query = `
        SELECT *
        FROM Patients`
        return new Promise((resolve, reject) => {
            db.all(query, (err, data) => {
                err ? reject({msg: 'err findAll patient', err: err}): resolve(data)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            let queryCreate = `
            INSERT INTO Patients (name, diagnosis)
            VALUES (?, ?)`
            let input = Object.values(this).filter(e => e)
            db.run(queryCreate, input, function(err) {
                if (err) {
                    reject({msg: 'err insert data patient', err: err})
                } else {
                    resolve(this)
                }
            })
        })
    }

}

module.exports = Patient