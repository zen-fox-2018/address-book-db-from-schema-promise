const db = require(`../db`)

class Patient {
    static registerPatient(name, disease) {
        return new Promise(function (resolve, reject) {
            const query = `INSERT INTO Patients (
                name,
                disease
                ) VALUES (
                    "${name}",
                    "${disease.join(`, `)}"
                    );`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }

}

module.exports = Patient