const View = require('../views/View')
const Employee = require('../models/Employee')
const Patient = require('../models/Patient')

class Controller {
    static register(input) {
        let newEmployee = new Employee(input.name, input.username, input.password, input.position)
        
        newEmployee.create()  
            .then(() => {
                View.displaySuccess('Success ')
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            });
    }

    static login(input) {
        Employee.findOne({field: 'isLogin', value: 'true'})
            .then((data) => {
                if(data) {
                    throw `somebody is log in`
                } else {
                    return Employee.findOne({field: 'username', value: input.username})
                }
            })
            .then((dataEmployee) => {
                if(dataEmployee) {
                    if(dataEmployee.password !== input.password) {
                        throw `Wrong password`
                    } else {
                        return dataEmployee.update({field: 'isLogin', value: 'true', username: input.username})
                    }
                } else {
                    throw `Username not found`
                }
            })
            .then(() => {
                View.displaySuccess('Success Log in')
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            })
    }

    static registerPatient(input) {
        Employee.findOne({field: 'isLogin', value: 'true'})
            .then((data) => {
                if(!data) {
                    View.alert('Please log in first')
                } else {
                    if(data.position !== 'docter') {
                        throw `only doctor can add Patient`
                    } else {
                        let newPatient = new Patient(null, input.name, input.diagnose)
                        return newPatient.create()
                    }
                }
            })
            .then((data2) => {
                if(data2) {
                    View.displaySuccess('Berhasil add patient')
                }
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            })
    }

    static logout(input) {
        Employee.findOne({field: 'username', value: input.username})
            .then((data) => {
                if(!data) {
                    throw `You're not log in`
                } else {
                    return data.update({field: 'isLogin', value: 'false', username: input.username})
                }
            })
            .then(() => {
                View.displaySuccess('Berhasil Logout')
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            })
    }

    static delete(input) {
        Employee.findOne({field: 'username', value: input.username})
            .then((data) => {
                if(!data) {
                    throw `No data found`
                } else {
                    return data.delete(data.username)
                }
            })
            .then(() => {
                View.displaySuccess('Berhasil Hapus Data Employee')
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            })
    }
}

module.exports = Controller