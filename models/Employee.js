const db = require ('./database/db.js')

class Employee {
    constructor (name, position, username, password, id) {
        this.id = id
        this.name = name
        this. position = position
        this.username = username
        this.password = password
    } 

    static findWhere (field, value) {
        let query = `
                    SELECT * FROM Employees
                    WHERE "${value}" = Employees.${field}
        `
        return new Promise (function (resolve,reject){
            db.get(query, function(err, data) {
                if(err) {
                    reject(err)
                }else {
                    if(data !== undefined){
                        let obj = new Employee (data.name, data.position, data.username, data.password, data.id)
                        resolve(obj)
                    }else{
                        resolve(data)
                    }
                }
            })
        })
    }

    static create (name, position, username, password) {
        let query = `
                    INSERT INTO Employees
                    (name, position, username, password, login)
                    VALUES
                    ("${name}", "${position}", "${username}", "${password}", "false" )
        `
        return new Promise (function (resolve, reject) {
            db.run(query, function(err) {
                if(err) {
                    reject (err)
                }else {
                    let obj = new Employee (name, position, username, password, this.lastID)
                    resolve(obj)
                }
            })
        })
    }

    static update (field, value, id) {
        let query = `
                    UPDATE Employees
                    SET ${field} = "${value}"
                    WHERE Employees.id = ${Number(id)}
        `
        return new Promise (function(resolve, reject) {
            db.run (query, function(err) {
                if (err) {
                    reject(err)
                }else {
                    resolve()
                }
            })
        })
    }

    static findAll () {
        
    }
}

module.exports = Employee