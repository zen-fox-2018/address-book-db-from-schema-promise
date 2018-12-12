const db = require('../db')

class Employee {
  constructor(input) {
    this.id = input.id
    this.username = input.username
    this.position = input.position
    this.password = input.password
    this.login = input.login || 0
  }

  static runQue(query, input) {
    return new Promise((res, rej) =>{
      db.run(query,input, function(err) {
        if(err) {
          rej(err)
        } else {
          let data = this
          res(data)
        }
      })
    })
  }

  static findOne(obj) {
    return new Promise((res, rej) => {
      let query = `
        SELECT * FROM employees WHERE ${obj.where} = ?
      `
      db.get(query, [obj.value], (err,row) => {
        if(err) {
          rej(err)
        } else {
          if(row) {
            let newEmp = new Employee(row) 
            res(newEmp)
          } else {
            res(null)
          }
        }
      })
    })
  }

  static findAll() {
    return new Promise((res, rej) => {
      let query = `
        SELECT * FROM employees
      `
      db.all(query, (err,rows) => {
        if(err) {
          rej(err)
        } else {
          let temp = []
          rows.forEach(e => {
            temp.push(new Employee(e))
          })
          res(temp)
        }
      })
    })
  }

  update(obj) {
    return new Promise((res, rej) => {
      let query = `UPDATE employees SET ${obj.set} = ? WHERE ${obj.where} = ?`

      Employee.runQue(query, [obj.val, this[obj.where]])
        .then(emp => {
          res(emp)
        })
        .catch(err => {
          rej(err)
        })
    })
  }

  save() {
    return new Promise ((res, rej) => {
      let query = `INSERT INTO employees (username, position, password, login)
      VALUES (?,?,?,?)
      `
      Employee.runQue(query, [this.username, this.position, this.password, this.login])
        .then(emp => {
          res(emp)
        })
        .catch(err => {
          rej(err)
        })
    })
  }

  delete(obj) {
    return new Promise((res, rej) => {
      let query = `DELETE FROM employees WHERE ${obj.where} = ?`

      Employee.runQue(query , [this[obj.where]])
        .then(emp => {
          res(emp)
        })
        .catch(err => {
          rej(err)
        })
    })
  }

  static count() {
    return new Promise((res, rej) => {
      let query =`SELECT COUNT(*) as "total" from employees`
      db.get(query, (err, row) => {
        if(err) {
          rej(err)
        } else {
          res(row)
        }
      })
    })
  }
}


module.exports = Employee