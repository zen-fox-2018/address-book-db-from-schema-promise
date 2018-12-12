const db = require('../dbConnect.js');

class Patients {

    constructor(name, diagnosis) {
        this.name = name;
        this.diagnosis = diagnosis;
    }

    static findAll() {

        return new Promise((resolve, reject) => {

            let qSearch =
                `
            SELECT
             *
            FROM
             Patients
            ;`;

            db.all(qSearch, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })

        });

    }

    static insert(name, diagnosis) {

        return new Promise((resolve, reject) => {
            let qAddData =
            `
            INSERT INTO
            Patients (name, diagnosis)
            VALUES ("${name}", "${diagnosis}")
            ;`;

            db.run(qAddData, (err) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });


    }
}

module.exports = Patients;