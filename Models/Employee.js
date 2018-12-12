const db = require(`../db`)
const bcrypt = require(`bcryptjs`)

class Employee {
    constructor(input) {
        this.username = input.username
        this.password = input.password
        this.role = input.role
    }

    static create(username, password, role) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(password, 10, function (err, hash) {
                err && reject(err)
                let insertQuery = `INSERT INTO Employees (
                    username, password, role, isLogin
                ) VALUES (
                    "${username}", "${hash}", "${role}", false
                )`

                db.run(insertQuery, function (err) {
                    err ?
                        reject(err) :
                        resolve(this)
                })
            });
        })
    }

    static readAll() {
        let readQuery = `SELECT * FROM Employees`
        db.all(readQuery, function (err, rows) {

        })

    }

    static readOne(column, status) {
        return new Promise(function (resolve, reject) {
            let readOnequery = `SELECT * FROM Employees WHERE ${column} = "${status}"`
            db.get(readOnequery, function (err, row) {
                err ?
                    reject(err) :
                    resolve(row)
            })
        })
    }

    static update(whereCase, whereStatus, column, colStatus) {
        return new Promise(function (resolve, reject) {
            let updateQuery = `UPDATE Employees SET ${column} = ${colStatus} WHERE ${whereCase} = "${whereStatus}"`
            db.run(updateQuery, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }

}

module.exports = Employee 