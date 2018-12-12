const db = require('./connection')
class Employee {
    constructor(id, name, role, username, password, status) {
        this.id = id
        this.name = name;
        this.role = role;
        this.username = username;
        this.password = password;
        this.status = status
    }

    static convert(data) {
        let list = []
        for (let i = 0; i <= data.length-1; i++) {
            let theData = new Employee(data[i].id, data[i].name, data[i].position, data[i].username, data[i].password, data[i].status);
            list.push(theData)
        }
        return list
    }

    static createList(name, role, username, password, status) {
        let query = `
            INSERT INTO Employees
            (name, position, username, password, status)
            VALUES
            ("${name}", "${role}", "${username}", "${password}", "${status}")`

        return new Promise(function(resolve, reject) {
            db.run(query, function(err) {
                if (err) {
                    reject(err);
                } else {
                    Employee.getList()
                    .then(function(dataEmployee) {
                        resolve(dataEmployee)
                    })
                    .catch(function(err) {
                        reject(err)
                    })
                }
            })
        })
    }

    static getList() {
        let query = `
            SELECT * FROM Employees`
        
        return new Promise(function(resolve, reject) {
            db.all(query, function(err, dataEmployee) {
                if (err) {
                    reject(err)
                } else {
                    let data = Employee.convert(dataEmployee)
                    resolve(data)
                }
            })
        })
        
    }
    
    static updateStatus(status, name) {
        let query = `
            UPDATE Employees
            SET status = "${status}"
            WHERE Employees.name = "${name}"`

        return new Promise(function(resolve, reject) {
            console.log(query)
            db.run(query, function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static deleteRows(target) {
        let query = `
            DELETE FROM Employees
            WHERE id = "${target}"`
        
        return new Promise(function(resolve, reject) {
            db.run(query, function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static findData(target, condition) {
        let query = `SELECT * FROM Employees
            WHERE "${target}" = "${condition}"`
        return new Promise(function(resolve, reject) {
            db.get(query, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        
    }

}
module.exports = Employee;