const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Employee {
  constructor(input) {
    this.id = input.id
    this.username = input.username
    this.password = input.password
    this.role = input.role
    this.isLogin = input.isLogin || 0
  }

  static findAll() {
    let query =
    `
      SELECT * FROM Employees;
    `
    let promise = new Promise(function(resolve, reject) {
      db.all(query, function(err, rows) {
        if (err) {
          reject(err)
        }
        else {
          let employees = []
          for (let i = 0; i < rows.length; i++) {
            employees.push(new Employee(rows[i]))
          }
          resolve(employees)
        }
      })
    })
    return promise
  }

  static findOne(obj) {
    let field = obj.field
    let value = obj.value

    let query =
    `
      SELECT * FROM Employees
      WHERE ${field} = ${value};
    `

    let promise = new Promise(function(resolve, reject) {
      db.get(query, function(err, row) {
        if (err) {
          reject(err)
        }
        else {
          if (!row) {
            resolve({})
          }
          else {
            let data = new Employee(row)
            resolve(data)
          }
        }
      })
    })
    return promise
  }

  save() {

    const input = Object.values(this).filter(function(element) {
      return element
    })

    let query =
    `
      INSERT INTO Employees
      (username, password, role, isLogin)
      VALUES
      (?, ?, ?, ? );
    `
    let promise = new Promise(function(resolve, reject) {
      db.run(query, input, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(this)
        }
      })
    })
    return promise
  }

  update(obj) {
    let query =
    `
      UPDATE Employees
      SET ${obj.field} = ${obj.value}
      WHERE id = ${this.id};
    `

    let promise = new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(this)
        }
      })
    })
    return promise
  }
}

module.exports = Employee