const Employee = require('../models/Employee.js')
const Patient = require('../models/Patient.js')
const View = require('../views/View.js')

class Controller {
    static searchEmployee() {
        Employee.findByAll().then((data)=> {
            View.showData(data)
        }).catch((err)=> {
            View.showErr(err)
        })

    }

    static searchPatient() { 
        Patient.findByAll().then(data=> {
            View.showData(data)
        }).catch(err => {
            View.showErr(err)
        })
    }

    static registerData(name, username, password, role) {
        Employee.insertDataEmployee([name, username, password, role]).then(()=> {
           return Employee.CountEmployee()
        }).then((dataCount)=> {
            View.showSuccess(dataCount[0].total)
        })
        .catch((err)=> {
            View.showErr(err)
        })
    }

    static loginEmployee(name, password) {
        Employee.findOne('isLogin', 1).then((data)=> {
            if(data.length) {
                throw `User already logged in`
            } else {
                return Employee.findOne('username', name)
            }
        }).then((dataEmployee)=> {
            if(dataEmployee.length == 0) {
                throw `username / password wrong`
            } else if (dataEmployee[0].password == password){
                return Employee.updateIsLog(dataEmployee[0].id, 1)
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
            if(!data.length) {
                throw `User need to logged in`
            } else {
                tempData = data
                return Employee.updateIsLog(data[0].id, 0)
            }
        }).then(()=> {
            View.successLogout(tempData[0].username)
        }).catch(err => {
            View.showErr(err)
        })
    }

    static addPatient(name, diagnosis) {
        Employee.findOne('isLogin', 1).then(data => {
            if(!data.length) {
                throw `User need to logged in`
            } else {
                if(data[0].posisition != 'dokter') {
                    throw `tidak memiliki akses untuk add patient`
                } else {
                    return Patient.insertPatient(name, diagnosis)
                }
            }
        }).then(()=> {
            return Patient.CountPatient()
        }).then(dataCount => {
            View.successAddPatient(dataCount[0].total)
        })
        .catch(err=> {
            View.showErr(err)
        })
    }
}
module.exports = Controller