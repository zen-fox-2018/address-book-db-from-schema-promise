const db = require('../database/connection.js');

//MODEL is just for query -- single responsibility

class Employee {
  constructor(id, name, username, password, role) {
    this.id = id
    this.name = name
    this.username = username
    this.password = password
    this.role = role
  }

  static showAll() {
    return new Promise ((resolve, reject) => {
      let query = `SELECT * FROM employees;`
      db.all(query, (err, data) => {
        if(err) {
          reject(err);
        } else {
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            let employeeData = new Employee(data[i].id, data[i].name, data[i].username, data[i].password, data[i].role);
            arr.push(employeeData);
          }
          resolve(arr);
        }
      })
    })
  }

  static insertData(name, username, password, role) {
    return new Promise((resolve, reject) => {
      let query = 
        `INSERT INTO Employees (name, username, password, role)
         VALUES ("${name}", "${username}", "${password}", "${role}");`;
      db.run(query, (err) => {
        if(err) {
          reject(err)
        } else {
          let newEmployee = new Employee(name, username, password, role);
          resolve()
        }
      })
    })
  }

  static countAll() {
    return new Promise((resolve, reject) => {
      let query = 
      `SELECT COUNT(*) AS count FROM Employees;`
      db.get(query, (err, totalCount) => {
        if(err) {
          reject(err)
        } else {
          resolve(totalCount.count)
        }
      })
    })
  }

  static findOneBy(condition, value) {
    return new Promise((resolve, reject) => {
      let query =
      `SELECT * FROM Employees
       WHERE ${condition} = "${value}";`
       db.get(query, (err, data) => {
         if (err) {
           reject(err);
         } else {
           resolve(data);
         }
       })
    })
  }

  static updateCol(colName, value, id) {
    return new Promise ((resolve, reject) => {
      let query =
      `UPDATE Employees
       SET ${colName} = "${value}"
       WHERE id = ${id};`;
      db.run(query, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

}

module.exports = Employee;