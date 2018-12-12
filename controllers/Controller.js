const Employee = require('../models/Employee.js')
const Patient = require('../models/Patient.js')
const View = require('../views/View.js')

class Controller {
    static searchEmployee() {
        Employee.findByAll()
        .then((data)=> {
            View.showData(data)
        }).catch((err)=> {
            View.showErr(err)
        })

    }

    static searchPatient() { 
        Patient.findByAll()
        .then(data=> {
            View.showData(data)
        }).catch(err => {
            View.showErr(err)
        })
    }

    static registerData(name, username, password, role) {
        Employee.insertDataEmployee([name, username, password, role])
        .then(()=> {
           return Employee.CountEmployee()
        })
        .then((dataCount)=> {
            View.showSuccess(dataCount.total)
        })
        .catch((err)=> {
            View.showErr(err)
        })
    }

    static loginEmployee(name, password) {
        Employee.findOne('isLogin', 1).then((data)=> {
            if(data) {
                throw `User already logged in`
            } else {
                return Employee.findOne('username', name)
            }
        }).then((dataEmployee)=> {
            if(!dataEmployee) {
                throw `username / password wrong`
            } else if (dataEmployee.password == password){
                return Employee.updateData(dataEmployee.id, 1, 'isLogin')
            } else {
                throw `username / password wrong`
            }
        }).then(()=> {
            View.successLogin(name)
        }).catch((err)=> {
            View.showErr(err)
        })
    }

    static logoutEmployee() {
        let tempData = []
        Employee.findOne('isLogin', 1).then((data)=> {
            if(!data) {
                throw `User need to logged in`
            } else {
                tempData = data
                return Employee.updateData(data.id, 0, 'isLogin')
            }
        }).then(()=> {
            View.successLogout(tempData.username)
        }).catch(err => {
            View.showErr(err)
        })
    }

    static addPatient(name, diagnosis) {
        Employee.findOne('isLogin', 1).then(data => {
            if(!data) {
                throw `User need to logged in`
            } else {
                if(data.posisition != 'dokter') {
                    throw `tidak memiliki akses untuk add patient`
                } else {
                    return Patient.insertPatient(name, diagnosis)
                }
            }
        }).then(()=> {
            return Patient.CountPatient()
        }).then(dataCount => {
            View.successAddPatient(dataCount.total)
        })
        .catch(err=> {
            View.showErr(err)
        })
    }
}
module.exports = Controller