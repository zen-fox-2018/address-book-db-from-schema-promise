const db = require('./dbConnection')

class Employee {
  constructor(id, username, password, role, isLogged = 0) {
    this.id = id
    this.username = username
    this.password = password
    this.role = role
    this.isLogged = isLogged
  }

  static findAll() {
    return new Promise( (resolve, reject) => {
      let query = `SELECT *
          FROM Employees
        `
      
      db.all(query, function (err, data) {
        if (err) {
          reject(err)
        } else {
          let output = []
          data.forEach( a => {
            output.push(new Employee(a.id, a.username, a.password, a.role, a.isLogged))
          })
          resolve(output)
        }
      })
    })
  }

  static findOne(field, value) {
    return new Promise( (resolve, reject) => {
      let query = `
          SELECT *
          FROM Employees
          WHERE "${field}" = "${value}"
        `
      db.get( query , function (err, rows) {
        if (err) {
          reject(err)
        } else {
          let output = null
          if (rows) {
            output = new Employee(rows.id, rows.username, rows.password, rows.role, rows.isLogged)
          }
          resolve(output)
        }
      })
    })
  }

  static update(field, value) {
    return new Promise( (resolve, reject) => {
      let query = `
          UPDATE Employees
          SET "${field[1]}" = "${value[1]}"
          WHERE "${field[0]}" = ${value[0]}
        ` 
      db.run( query, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this)
        }
      })
    })
  }

  static create(input) {
    return new Promise ( (resolve, reject) => {
      let query = `
          INSERT INTO Employees (id, username, password, role, isLogged)
          VALUES (null, "${input[0]}", "${input[1]}", "${input[2]}", 0 )
        `
      db.run( query, function (err) {
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