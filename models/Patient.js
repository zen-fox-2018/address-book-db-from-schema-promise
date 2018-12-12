const db = require('../database/connection.js')

class Patient {
    constructor(name, diagnosis) {
        this.name = name
        this.diagnosis = diagnosis
    }

    // static readAllData(cb) {
    //     let query = `SELECT * FROM Patients`
    //     db.all(query, function (err, rows) {
    //         if (err) {
    //             cb(err, null)
    //         }
    //         else {
    //             cb(null, rows)
    //         }
    //     })
    // }

    static readAllData(){
        let query = `SELECT * FROM Patients`
        return new Promise((resolve,reject)=> {
            db.all(query, function(err,rows){
                if(err){
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = Patient