const db = require('../database/connection.js')


class Patient {
    constructor( name, diagnosis) {
      this.name = name
      this.diagnosis = diagnosis
    }

    static findAll(){
        return new Promise(function(resolve, reject){
            let select = `SELECT * FROM Patients`
            db.all(select, function(err, data){
                if(err){
                    reject(err)
                }   else{
                    let arrData = []
                    
                    for(let i = 0; i < data.length; i++){
                        arrData.push(new Patient(data[i].name, data[i].diagnosis))
                    }
                    resolve(arrData)
                }
            })
        })
    }
    
    static insert(patient){
        return new Promise(function(resolve, reject){
            let query = 
            `INSERT INTO Patients
            VALUES (null, '${patient.name}', '${patient.diagnosis}')`
    
            db.run(query, function (err){
                if(err){
                    reject(err)
                }   else{
                    resolve(null)
                }
            })
        })
    }

}

module.exports = Patient