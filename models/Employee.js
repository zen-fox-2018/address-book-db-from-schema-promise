const db = require('../db')
class Employee {
    constructor(object) {
        this._id = object.id;
        this._username = object.username;
        this._password = object.password;
        this._role = object.role;
        this._login = object.login;
    }

    get id() {
        return this._id
    }

    set id(input) {
        this._id = input
    }

    get username() {
        return this._username
    }

    get password() {
        return this._password
    }

    get role() {
        return this._role
    }

    get login() {
        return this._login
    }

    set login(input) {
        this._login = input
    }

    static execute(query , input) {
        return new Promise ((resolve, reject) => {
            db.run(query, input, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }
    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM Employees`
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    let result = []
                    rows.forEach(element => {
                        let employ = new Employee(element)
                        result.push(employ)
                    });
                    resolve(result)
                }
            })
        })
    }
    static findOne(data) {
        return new Promise ((resolve, reject) => {
            let query = 
            `SELECT * FROM Employees 
             WHERE ${data.field} = ?`
             let input = [data.value]
             db.get(query, input, function(err, row) {
                 if (err) {
                    reject(err)
                } else {
                    if (!row) {
                        resolve(null)
                    } else {
                        let employ = new Employee(row)
                        resolve(employ)
                    }
                }
            })
        })
    }
    static countEmployee() {
        return new Promise ((resolve, reject) => {
            let query = `SELECT COUNT(*) AS total FROM Employees`
            db.get(query, function(err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row.total)
                }
            })
        })
    }
    create() {
        return new Promise ((resolve, reject) => {
            let query = `INSERT INTO Employees (username, password, role)
            VALUES (?, ?, ?)`
            let input = Object.values(this).filter(x => x !== undefined)
            Employee.execute(query, input)
                .then((data)=> {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    update(field) {
        return new Promise ((resolve, reject) => {
            let query = `UPDATE Employees 
                set ${field} = ?
                WHERE id = ?`
                let input = [this[field], this.id]
            Employee.execute(query, input)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(data)
                })
        })
    }

    delete(object) {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM Employees
                        WHERE ${object.field} = ?`
            let input = [object.value]
            Employee.execute(query, input)
                .then((data)=> {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = Employee