const db = require('../dbConnect');

class Employees {
    constructor(name, position, username, password) {
        this.name = name;
        this.position = position;
        this.username = username;
        this.password = password;
        this.isLogin = 0;
    }

    static findAll() {

        return new Promise((resolve, reject) => {

            let qSearch =
                `
            SELECT
             *
            FROM
             Employees
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

    static insert(name, position, username, password) {

        return new Promise((resolve, reject) => {
            let qInsert =
                `
            INSERT INTO
             Employees
            (name, position, username, password, isLogin)
            VALUES
            ("${name}","${position}","${username}","${password}", 0)
            ;`;

            db.run(qInsert, (err) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            })

        })
    }

    static findOne(field, value) {

        return new Promise((resolve, reject) => {

            var qSearchOne;

            if (isNaN(+value)) {
                qSearchOne =
                    `
                SELECT
                 *
                FROM
                 Employees
                WHERE
                 ${field} = "${value}"
                ;`;
            } else {
                qSearchOne =
                    `
                SELECT
                 *
                FROM
                 Employees
                WHERE
                 ${field} = ${+value}
                ;`;
            }

            db.get(qSearchOne, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });

        });
    }

    static updateLogin(username) {

        return new Promise((resolve, reject) => {

            let qUpdateLogin =
            `
            UPDATE Employees
            SET isLogin = 1
            WHERE Employees.username = "${username}"
            ;`;

            db.run(qUpdateLogin, (err) => {
                if (!err) {
                    resolve(username);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = Employees;