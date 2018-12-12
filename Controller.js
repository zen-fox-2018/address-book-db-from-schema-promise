const view = require('./view')
const Employee = require('./models/Employee');
const Patient = require('./models/Patient');

class HospitalController {
    static findAllEmployee() {
        Employee.getList().then(function(dataEmployee) {
            view.showAllEmployee(dataEmployee);
        })
        .catch(function(err) {
            view.showAllEmployeeFailed(err);
        });
    }

    static addEmployee(name, position, username, password) {
        Employee.createList(name, position, username, password, "off").then(function(dataEmployee) {
            view.registrationSucceed(dataEmployee)
        })
        .catch(function(err) {
            view.registrationFailed(err)
        })
        
    }

    static deleteData(target) {
        Employee.deleteRows(target).then(function() {
            view.deleteSucceed()
        })
        .catch(function(err) {
            view.deleteFailed(err)
        })
    }

    static login(username, password) {
        Employee.findData(`status`, `on`)
        .then(function(data) {
            if (data === undefined) {
                return Employee.findData("username", username)
            } else {
                view.cantlogin()
            }
        })
        .then(function(data) {
            if (data.password === password) {
                view.loginSucceed(data.name)
                return Employee.updateStatus(`on`, data.name)
            }else {
                view.loginFailed()
            }
        })
        .then(function(data) {
            console.log()
        })
        .catch(function(err) {
              throw err
        })
    }

    static addPatient(name, diagnosis) {
        
    }
}
module.exports = HospitalController