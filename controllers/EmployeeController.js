const Employee = require('../models/Employee')
const View = require('../views/View')
const Patient = require('../models/Patient')

class EmployeeController {

    static register(input) {
        if (input.length < 4) {
            View.displayErr('input kurang')
        } else {
            let obj = {
                username : input[0],
                password: input[1],
                role: input[2]
            }
            let employ = new Employee(obj)
            employ.create()
            .then((data)=> {
                employ.id = data.lastID
                return Employee.countEmployee()
            })
            .then((length)=> {
                View.displaySuccess(`berhasil register ${JSON.stringify(employ)}, total Employee : ${length} `)
            })
            .catch((err) => {
                if (err.code === "SQLITE_CONSTRAINT") {
                    View.displayErr('username sudah terpakai')
                } else {
                    View.displayErr(err)
                }
            })

        }
        
    }

    static login(input) {
        let search = {
            field : "username",
            value : input[0]
        }
        let login = {
            field: "login",
            value: 1
        }
        Employee.findOne(login)
            .then((data) => {
                if (data) {
                    throw "sudah ada yang login"
                } else {
                    return Employee.findOne(search)
                }
            })
            .then((data) => {
                if (!data) {
                    throw "username tidak ada"
                } else {
                    if (data.password !== input[1]) {
                        throw "password salah"
                    } else {
                        let employ = data
                        employ.login = 1
                        return employ.update("login")
                    }    
                }
            })
            .then((data) => {
                View.displaySuccess(`user ${input[0]} success logged in`)
            })
            .catch((err) => {
                    View.displayErr(err)
            })
    }

    static AddPatient(input) {
        let diagnosa = input.slice(1)
        let patient = {
            name : input[0],
            diagnosis: diagnosa.join(',')
        }
        let login = {
            field : "login",
            value: 1
        }
        Employee.findOne(login)
            .then((data) => {
                if (data === null) {
                    throw "silahkan login terlebih dahulu"
                } else {
                    if (data.role !== "dokter") {
                        throw "yang punya akses hanya dokter"
                    } else {
                        let person = new Patient(patient)
                        console.log(person)
                        return person.create()
                    }
                }
            })
            .then((data) => {
                return Patient.countPatient()
            })
            .then((data) => {
                View.displaySuccess(`berhasil menambahkan pasien , total patient : ${data}`)
            })
            .catch((err) => {
                View.displayErr(err)
            })

    }

    static logout() {
        let login = {
            field: "login",
            value: 1
        }
        Employee.findOne(login)
            .then((data) => {
                if (data === null) {
                    throw "anda tidak login"
                } else {
                    data.login = 0
                    return data.update("login")
                }
            })
            .then((data) => {
                View.displaySuccess('anda berhasil logout')
            })
            .catch((err) => {
                View.displayErr(err)
            })
    }
}

module.exports = EmployeeController