const View = require('./view.js');
const Employee = require('./models/employeesModel.js');
const Patient = require('./models/patientsModel.js');

class Controller {
  static create(username, password, role){
    var datalength = null;
    var newUser = new Employee(username, password, role);
    newUser.create()
    .then(() => {
      return Employee.findAll()
    })
    .then(data => {
      View.successCreateUser(newUser,data.length)
    })
    .catch(err =>{
      View.errCreateUser(err)
    })
  }

  static login(username, password){
    Employee.login(username, password)
    .then(data => {
      if (data != -1) {
        View.somebodyIsLogin(data)
      }
      else if (data == -1){
        View.userSuccessLogin(username);
      }
    })
    .catch(err =>{
      View.errLogin(err);
    })
  }

  static addPatient(name, diagnose){
    Employee.findWhere('isLogin', 1)
    .then(data =>{
      if (data[0].role == 'dokter') {
        var newPatient = new Patient(name, diagnose);
        // console.log(name);
        return Patient.create(name, diagnose)
      }
      else {
        View.notDoctor();
      }
    })
    .then((data)=>{
      Patient.findAll()
      .then((data)=>{
        View.addPatientSuccess(data.length);
      })
    })
    .catch(err =>{
      View.errAddPatient(err);
    })
  }

}

module.exports = Controller;
