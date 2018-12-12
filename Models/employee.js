
const db = require("../db");

class Employees {
    constructor(id, name, position, username, password) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.username = username;
        this.password = password;
        this.isLogin = 0;
    }

    static findOne(field, value) {
        let querySelectRow = `SELECT * FROM Employees
                              WHERE ${field} = "${value}"`
        return new Promise((resolve, reject) => {
            db.get(querySelectRow, function(err, rows) {
                if(err) {
                    reject(err)
                } else {
                    if(rows === undefined) {
                        throw err
                    } else {
                        let newRows = new Employees(rows.id, rows.name, rows.position, rows.username, rows.password);
                        resolve(newRows)   
                    }
                }
            })
        })
    }

    static findAll() {
        let selectAll = `SELECT * FROM Employees`;
        return new Promise((resolve, reject) => {
            db.all(selectAll, function(err, data) {
                if(err) {
                    reject(err)
                } else {
                    let result = [];
                    for(let i = 0; i < data.length; i++) {
                        let select = new Employees(data[i].id, data[i].name, data[i].position, data[i].username, data[i].password);
                        result.push(select)
                    }
                    resolve(result)
                }
            })
        })
    }

    create() {
        let createEmployee = `INSERT INTO Employees(name, position, username, password)
                              VALUES("${this.name}", "${this.position}", "${this.username}", "${this.password}")`
        return new Promise((resolve, reject) => {
            db.run(createEmployee, function(err) {
                if(err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }

    update(column, value, id) {
        let query = `UPDATE Employees
                     SET ${column} = "${value}"
                     WHERE 
                        id = ${id}`
        return new Promise((resolve, reject) => {
            db.run(query, function(err) {
                if(err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }

    static delete(id) {
        let queryDelete = `DELETE FROM Employees
                           WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            db.run(queryDelete, function(err) {
                if(err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }
}

module.exports = Employees