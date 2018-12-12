const db = require('../db')

class Employee {
    constructor(name, username, password, position) {
        this.name = name,
        this.username = username,
        this.password = password,
        this.position = position,
        this.isLogin = 'false'
    }
    
    static findAll() {
        let query = `SELECT * FROM Employees`
        return new Promise ((resolve, reject) => {
            db.all(query, function(err, data) {
                if(err) {
                    reject(err)
                } else {
                    let newData = []
                    for(let i = 0; i < data.length; i++) {
                        let person = new Employee(data[i].name, data[i].username, data[i].password, data[i].position)
                        newData.push(person)
                    }
                    resolve(newData)
                }
            })
        })
    }

    static findOne(input) {
        let query = `SELECT * FROM Employees WHERE ${input.field}  = "${input.value}"`
        
        return new Promise ((resolve, reject) => {
            db.get(query, function(err, row) {
                if(err) {
                    reject(err)
                } else {
                    if(row) {
                        let employee = new Employee(row.name, row.username, row.password, row.position)
                        resolve(employee)
                    } else {
                        resolve(null)
                    }
                }
            })
        })
    }

    create() {
        let query = `INSERT INTO Employees (name, username, password, position, isLogin)
        VALUES('${this.name}', '${this.username}', '${this.password}', '${this.position}', '${this.isLogin}')`
        
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

    update(input) {
        let query = `UPDATE Employees SET ${input.field} = "${input.value}" WHERE username = "${input.username}"`
        return new Promise ((resolve, reject) => {
            db.run(query, function(err) {
                if(err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })

    }

    delete(input) {
        let query = `DELETE FROM Employees WHERE username = "${input}"`

        return new Promise ((resolve, reject) => {
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

module.exports = Employee