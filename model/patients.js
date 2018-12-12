const db = require('../database/connection.js')

class Patients {
    constructor(){

    }
    static create(input) {
        return new Promise(function(resolve, reject){
            db.run(`INSERT INTO Patients (name, diagnose)
                    VALUES (
                            "${input.name}",
                            "${input.diagnose}"
                    )`, (err)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    })
        })
    }
    static countPatients() {
        return new Promise((resolve,reject)=>{
            db.all(`SELECT COUNT(*) AS total FROM Patients`,(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
}

module.exports = Patients