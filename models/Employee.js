const db = require('../db')
const bcrypt = require('bcryptjs')

class Employee {
    constructor(obj) {
        this.id = obj.id
        this.username = obj.username
        this.password = obj.password
        this.role = obj.role
        this.status = obj.status || 0
    }

    static findAll() {
        let query = `
        SELECT *
        FROM Employees`
        return new Promise((resolve, reject) => {
            db.all(query, (err, data) => {
                err ? reject({msg: 'err findAll employee', err: err}): resolve(data)
            })
        })
    }

    static findOne(obj) {
        let column = Object.keys(obj)
        let find = Object.values(obj)
        let query = `
        SELECT *
        FROM Employees
        WHERE ${column[0]} = ?`
        return new Promise((resolve, reject) => {
            db.get(query, find, (err, data) => {
                if (err) {
                    reject({msg: 'err findOne employee', err: err})
                } else {
                    data ? resolve(new Employee(data)): resolve(data)
                }
            })
        })
    }

    static count() {
        let query =`
        SELECT COUNT(*) AS length
        FROM Employees`
        return new Promise((resolve, reject) => {
            db.get(query, (err, data) => {
                err? reject({msg: 'err count', err: err}): resolve(data.length)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            bcrypt.hash(this.password, 10)
                .then(hash => {
                    this.password = hash
                    let queryCrete = `
                    INSERT INTO Employees (username, password, role, status)
                    VALUES (?, ?, ?, ?)`
                    let input = Object.values(this).filter(e => e !== undefined)
                    db.run(queryCrete, input, function(err) {
                        err? reject({msg: 'err insert data', err: err}): resolve(this)
                    })
                })
                .catch(err => {
                    reject({msg: 'from create', err: err})
                })
        })
    }

    update(obj) {
        let column = Object.keys(obj)
        let input = Object.values(obj)
        let queryUpdate = `
        UPDATE Employees
        SET ${column[0]} = ?
        WHERE id = ${this.id}`
        return new Promise((resolve, reject) => {
            db.run(queryUpdate, input, function(err) {
                if (err) {
                    reject({msg: 'err update data', err: err})
                } else {
                    resolve(this)
                }
            })
        })
    }



}

module.exports = Employee