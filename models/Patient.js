const db = require('../db')

class Patient {
    constructor(id, name, diagnose) {
        this.id = id
        this.name = name
        this.diagnose = diagnose
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