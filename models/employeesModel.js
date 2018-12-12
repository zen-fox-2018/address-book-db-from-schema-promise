const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./hospital.db')

class Employee {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.isLogin = 0;
  }

  static findAll(){
    var query = `SELECT *
                 FROM Employees;`;
    var promise = new Promise(function(resolve, reject) {
      db.all(query, function(err, data) {
        if (err) {
          reject(err)
        }
        else {
          resolve(data)
        }
      })
    });
    return promise;
  }

  static findWhere(parameter, value){
    var query = `SELECT *
                 FROM Employees
                 WHERE "${parameter}" = "${value}";`;
    var promise = new Promise(function(resolve, reject) {
      db.all(query, function(err, data) {
        if (err) {
          reject(err)
        }
        else {
          resolve(data)
        }
      })
    });
    return promise;
  }

  static updateIsLogin(data, loginStatus){
    var promise = new Promise(function(resolve, reject) {
      var update = `UPDATE Employees
                    SET
                    username = "${data.username}",
                    password = "${data.password}",
                    role = "${data.role}",
                    isLogin = "${loginStatus}"

                    WHERE id = "${data.id}";`;
      db.run(update, function(errUpdate) {
        if (errUpdate) {
          reject(errUpdate);
        }
        else {
          resolve()
        }
      })
    });
    return promise;
  }

  static login(username, password){
    var promise = new Promise(function(resolve, reject) {
      Employee.findWhere('isLogin', '1')
      .then(dataFindLogin => {
        if (dataFindLogin.length > 0) {
          resolve(dataFindLogin[0].username);
        }
        else {
          Employee.findWhere('username', username)
          .then(data=>{
            if (data[0].username == username && data[0].password == password) {
              Employee.updateIsLogin(data[0], 1)
                .then(() =>{
                  resolve(-1)
                })
                .catch(err =>{
                  reject(err);
                })
            }
          })
          .catch(err =>{
            reject(err);
          })
        }
      })
      .catch(err =>{
        reject(err);
      })
    })
    return promise
  }

  create(){
    var query = `INSERT INTO Employees
                 (username, password, role, isLogin)
                 VALUES
                 ("${this.username}","${this.password}","${this.role}","${this.isLogin}");`;
    var promise = new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve()
        }
      })
    });
    return promise;
  }
}


module.exports = Employee;
