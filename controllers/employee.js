const Employee = require('../models/employee');
const EmployeeView = require('../views/employee');
const Patient = require('../models/patient');

class ControllerEmployee {

  static createEmployee(data) {
    Employee.createEmployee(data)
    .then (() =>{
      return Employee.listAllEmployees()
    })

    .then((employees) => {
      let input = {
        name : data[0],
        username : data[1],
        password : data[2],
        position : data[3]
      }
      EmployeeView.showSuccess(`Successfully insert data ${JSON.stringify(input)}. Total data  = ${employees.length}` );
    })

      .catch((err) => {
        if (err.errno === 19) {
          let msg = `username already exists`;
          EmployeeView.showErr(msg);
        } else {
          EmployeeView.showErr(err)
        }
      })
  }

  static listAllEmployees() {
    Employee.listAllEmployees()
      .then((employees) => {
        EmployeeView.showData(employees);
      })
      .catch((err) => {
        EmployeeView.showErr(err);
      })
  }

  static findOne(data) {
    Employee.findOne(data)
      .then((employee) => {
        EmployeeView.showData(employee);
      })

      .catch((err) => {
        EmployeeView.showErr(err);
      })
  }

  static loginEmployees(activity, data) {
    let dataEmployee = null;
    Employee.findOne(['username', data[0]])
      .then((employee) => {
        if (employee) {
          if (employee.password === data[1]) {
            dataEmployee = employee;
            return Employee.findOne(['isLogin', 1]);
          } else {
            throw(`Wrong password!!`);
          }
        } else {
          throw(`Wrong user!!`);
        }
      })

      .then((employee) => {
        if (!employee) {
          if (activity === 'login') {
            let isLogin = ['isLogin', 1];
            return dataEmployee.updateEmployee(isLogin)
          } else {
            throw(`You are not logged in`);
          }
        } else if (employee.username === data[0]) {
          if (activity === 'login') {
            throw('You are already logged in.')
          } else {
            let isLogin = ['isLogin', 0];
            return dataEmployee.updateEmployee(isLogin)
          }
        } else {
          throw(`There are another user who logged in.`)
        }
      })

      .then(() => {
        let msg = '';
        if (activity === 'login') {
          msg = `Welcome`
        } else {
          msg = `Good bye`
        }
        EmployeeView.showSuccess(`${msg} ${dataEmployee.name}`);
      })

      .catch((err) => {
        EmployeeView.showErr(err);
      })
  }

  static addPatient(data) {
    Employee.findOne(['isLogin', 1])
      .then((employee) => {
        if (!employee) {
          throw (`Login as a doctor!!`)
        } else {
          if (employee.position === 'doctor') {
            return Patient.createPatient(data);
          } else {
            throw(`Don't have access to add a patient.`)
          }
        }
      })

      .then(() => {
        return Patient.listPatients();
      })

      .then((patients) => {
        EmployeeView.showSuccess(`Successfully insert patient. Total data : ${patients.length}`)
      })

      .catch((err) => {
        EmployeeView.showErr(err);
      })
  }

}

module.exports = ControllerEmployee;
