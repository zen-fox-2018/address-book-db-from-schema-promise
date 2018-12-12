const View = require('../views/View')
const Employee = require('../models/Employee')
const Patient = require('../models/Patient')

class Controller {
    static register(input) {
        let newEmployee = new Employee(input.name, input.username, input.password, input.position)
        
        newEmployee.create()  
            .then(() => {
                return Employee.findAll()
            })
            .then((data) => {
                View.displaySuccess(`Save data success {${input.name}, ${input.username}, ${input.password}, ${input.position}}. Total Employee: ${data.length}`)
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            });
    }

    static login(input) {
        Employee.findOne({field: 'isLogin', value: 'true'})
            .then((data) => {
                if(data) {
                    // View.alert('Somebody is Log In!!')
                    throw `somebody is log in`
                } else {
                    return Employee.findOne({field: 'username', value: input.username})
                }
            })
            .then((dataEmployee) => {
                if(dataEmployee) {
                    if(dataEmployee.password !== input.password) {
                        // View.alert('Wrong Password!!')
                        throw `Wrong Password!!`
                    } else {
                        return dataEmployee.update({field: 'isLogin', value: 'true', username: input.username})
                    }
                } else {
                    throw `Username Not Found!!`
                    // View.alert('Username Not Found!!')
                }
            })
            .then((data) => {
                View.displaySuccess(`User ${input.username} loged in successfully`)
            })
            .catch((err) => {
                View.displayErr('Err : ', err)
            })
    }

    static registerPatient(input) {
        Employee.findOne({field: 'isLogin', value: 'true'})
            .then((data) => {
                if(!data) {
                    throw `Please Log In First`
                    // View.alert('Please log in first')
                } else {
                    if(data.position !== 'docter') {
                        throw `only doctor can add Patient`
                    } else {
                        let newPatient = new Patient(null, input.name, input.diagnose)
                        newPatient.create()
                        return Employee.findAll()
                    }
                }
            })
            .then((patientData) => {
                if(patientData) {
                    View.displaySuccess(`Successfully add patient data. Total Patient: ${patientData.length}`)
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
                    // View.alert('You are not Log In')
                    throw('You are not Log In')
                } else {
                    return data.update({field: 'isLogin', value: 'false', username: input.username})
                }
            })
            .then((data) => {
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