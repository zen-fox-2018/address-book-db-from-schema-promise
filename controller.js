const View = require('./view.js');
const Employee = require('./models/employee.js');
const Patient = require('./models/patient.js');

class Controller {
  
  static registration(name, username, password, role) {
    Employee.findOneBy("username", username)
    .then((data) => {
      if(!data) {
        return Employee.insertData(name, username, password, role);
      } else {
        throw `Username has been used`;
      }
    })
    .then(() => {
      return Employee.countAll();
    })
    .then((totalCount) => {
      View.displayRegStatus(username, password, role, totalCount);        //kalau sudah berhasil
      })
    .catch((err) => { 
      View.displayError(err);
    })
  }

  static login(username, password) {
    Employee.findOneBy("isLogin", "1")
    .then((data) => {
      if (!data) {
        return Employee.findOneBy("username", username)
      } else {
        throw `Someone has not logged out yet`
      }
    })
    .then((data) => {
      if (data.password === password) {
        return Employee.updateCol("isLogin", 1, data.id)
      } else {
        throw `wrong username / password`;
      }
    })
    .then(() => {
      View.succeedLogin(username)
    })
    .catch((err) => {
      View.displayError(err);
    })
  }

  static addPatient(name, diagnosis) {
    Employee.findOneBy("isLogin", "1")
    .then((data) => {
      if(data.role === "dokter") {
        return Patient.insertData(name, diagnosis);
      } else {
        throw `cannot add patient's data`
      }
    })
    .then(() => {
      return Patient.countAll();
    })
    .then((count) => {
      View.succeedRegNewPatient(name, count);
    })
    .catch((err) => {
      View.displayError(err);
    })
  }
}

module.exports = Controller;
