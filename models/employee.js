const db = require('../db/connection');

class Employee {
  constructor(obj) {
    this.id = obj. id;
    this.name = obj.name;
    this.username = obj.username;
    this.password = obj.password;
    this.position = obj.position;
    this.isLogin = obj.isLogin;
  }

  static createEmployee(data) {
    const query = `
    INSERST INTO
    employees (name, username, password, position, isLogin)
    VALUES
    (?, ?, ?, ?, 0);
    `;
    return new Promise((resolve, reject) => {
      db.run(query, data, (errRun) => {
        if (errRun) {
          reject(errRun);
        } else {
          resolve();
        }
      })
    })
  }

  static listAllEmployees() {
    const query = `
      SELECT
        *
      FROM
        employees;
    `;

    return new Promise((resolve, reject) => {
      db.all(query, (err, employees) => {
        if (err) {
          reject(err);
        } else {
          let dataEmployees = [];
          employees.forEach(e => {
            dataEmployees.push(new Employee(e));
          })
          resolve(dataEmployees);
        }
      })
    })
  }

  static findOne(search) {
    const query = `
      SELECT
        *
      FROM
        employees
      WHERE ${search[0]} = ?`;
    return new Promise((resolve, reject) => {
      db.get(query, search.slice(1), (err, employee) => {
        if (err) {
          reject(err);
        } else {
          if (employee) {
            resolve(new Employee(employee));
          } else {
            resolve()
          }
        }
      })
    })
  }

  updateEmployee(data) {
    const query = `
      UPDATE
        employees
      SET
        ${data[0]} = ?
      WHERE
        id = ${this.id}
    `
    return new Promise((resolve, reject) => {
      db.run(query, data[1], (err) => {
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
