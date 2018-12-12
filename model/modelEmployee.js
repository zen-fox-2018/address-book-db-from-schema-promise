const db = require('../database/connection.js')

class Employee {
  constructor(name, username, password, role, loginStatus) {
    this.name = name
    this.username = username
    this.password = password
    this.role = role
    this.isLogin = loginStatus
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const query = `
                    SELECT *
                    FROM Employees;
                    `
      db.all(query, function(err, rows) {
        if (!err) {
          let newData = []
          for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            newData.push(new Employee(row.name, row.username, row.password, row.role, row.isLogin))
          }
          resolve(newData)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static register(name, username, password, role) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO "Employees" (name, username, password, role, isLogin)
              VALUES (
              "${name}",
              "${username}",
              "${password}",
              "${role}",
              0
              );`, function (err, registeredData) {
        if (!err) {
          resolve(registeredData)
        } else {
          reject(err)
        }
      })
    })
  }

  static findOne(column, value) {
    return new Promise((resolve, reject) => {
      const qFindOne = `
                       SELECT *
                       FROM Employees
                       WHERE Employees.${column} = "${value}";
                       `
       db.get(qFindOne, function (err, specificData) {
         if (!err) {
           resolve(specificData)
         } else {
           reject(err)
         }
       })
    })
  }

  static countAllData() {
    return new Promise((resolve, reject) => {
      const query = `
                    SELECT COUNT(*) AS countData
                    FROM Employees;
                    `
      db.get(query, function (err, countAll) {
        if (!err) {
          resolve(countAll)
        } else {
          reject(err)
        }
      })
    })
  }

  static updateFile(id, val, field) {
    return new Promise((resolve, reject) => {
      const query = `
                    UPDATE Employees
                    SET ${field} = ${val}
                    WHERE id = ${id};
                    `

      // console.log(query)
      db.run(query, (err) => {
        if (!err) {
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }

  static removeData(id) {
    return new Promise((resolve, reject) => {
      const deleteQuery = `
                          DELETE FROM Employees
                          WHERE Employees.id = ${id};
                          `
      db.run(deleteQuery, (err, dataRemoved) => {
        if (!err) {
          resolve(dataRemoved)
        } else {
          reject(err)
        }
      })
    })
  }
}

// Employee.updateFile(1, 1)
// .then(function(data) {
//   console.log(data)
// })
// .catch(function(err) {
//   console.log(err)
// })


// Employee.findAll()
// .then(function(newData) {
//   console.log(newData)
// })
// .catch(function(err) {
//   console.log(err)
// })

module.exports = Employee
