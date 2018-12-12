const Employee = require('../models/Employee')
const Patient = require('../models/Patient')
const View = require('../views/View')
const bcrypt = require('bcryptjs')

class ControllerEmployee {

    static register(obj) {
        let employee = new Employee(obj)
        employee.create()
            .then(data => {
                return Employee.count()
            })
            .then(count => {
                View.register(obj, count)
            })
            .catch(err => {
                err.err.errno === 19? View.displayError({msg: 'username sudah terpakai'}): View.displayError(err)
            })
    }

    static login(obj) {
        let find = {
            status: 1
        }
        let employee = []
        Employee.findOne(find)
            .then(login => {
                if (login) {
                    throw {msg: 'cannot login'}
                } else {
                    find = {
                        username: obj.username
                    }
                    return Employee.findOne(find)
                }
            })
            .then(data => {
                if (!data) {
                    throw {msg: 'wrong username'}
                } else {
                    employee = data
                    return bcrypt.compare(obj.password, employee.password)
                }
            })
            .then(checkPass => {
                if (!checkPass) {
                    throw {msg: 'wrong password'}
                } else {
                    let obj = {
                        status: 1
                    }
                    return employee.update(obj)
                }
            })
            .then(data => {
                View.login(employee.username)
            })
            .catch(err => {
                View.displayError(err)
            })
    }

    static logout(obj) {
        let find = {
            username: obj.username
        }
        let employee = []
        Employee.findOne(find)
            .then(data => {
                if (!data) {
                    throw {msg: 'wrong username'}
                } else {
                    let obj = {
                        status: 0
                    }
                    employee = data
                    return employee.update(obj)
                }
            })
            .then(data => {
                View.logout(employee.username)
            })
            .catch(err => {
                View.displayError(err)
            })
    }

    static addPatient(obj) {
        let find = {
            status: 1
        }
        Employee.findOne(find)
            .then(employee => {
                if (!employee) {
                    throw {msg: 'please login as a doctor'}
                } else {
                    if (employee.role !== 'dokter') {
                        throw {msg: 'tidak memiliki akses untuk add patient'}
                    } else {
                        let patient = new Patient(obj)
                        patient.diagnosis = patient.diagnosis.join(', ')
                        return patient.create()
                    }
                }
            })
            .then(data => {
                return Patient.count()
            })
            .then(count => {
                View.displayPatient(count)
            })
            .catch(err => {
                View.displayError(err)
            })
    }
}

module.exports = ControllerEmployee