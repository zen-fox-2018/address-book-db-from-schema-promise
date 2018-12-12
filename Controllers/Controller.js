const Employee = require(`../Models/Employee`)
const Patient = require(`../Models/Patient`)
const View = require(`../Views/View`)
const bcrypt = require(`bcryptjs`)

class Controller {
    static register(username, password, role) {
        Employee.readOne(`username`, username).then((result) => {
            if (result) {
                throw `username sudah ada`
            } else {
                return Employee.create(username, password, role)
            }

        }).then((result) => {
            View.successRegister(`success register with id ${result.lastID}`)
        }).catch((err) => {
            View.errorRegister(err)
        })
    }

    static login(username, password) {
        Employee.readOne(`isLogin`, true).then((result) => {
            if (result) {
                if (result.username == username) {
                    throw `${username} sudah login`
                } else {
                    throw `tidak bisa login, ada yang login`
                }
            } else {
                return Employee.readOne(`username`, username)
            }
        }).then((result) => {
            if (result == undefined) {
                throw `username tidak ada`
            } else {
                return bcrypt.compare(password, result.password)
            }
        }).then((result) => {
            if (result == true) {
                return Employee.update(`username`, username, `isLogin`, true)
            } else {
                throw `password salah`
            }

        }).then((result) => {
            View.successLogin(`${username} success login`)
        }).catch((err) => {
            View.errorLogin(err)
        });
    }

    static addPatient(name, disease) {
        Employee.readOne(`isLogin`, 1).then((result) => {
            if (result == undefined) {
                throw `kamu harus login sebagai dokter`
            } else {
                return Patient.registerPatient(name, disease)
            }
        }).then((result) => {
            if (result) {
                View.successAddPatient(`success add patient with id ${result.lastID}`)
            } else {
                throw `error add patient`
            }

        }).catch((err) => {
            View.errorAddPatient(err)
        });
    }

    static logout(username) {
        Employee.readOne(`username`, username).then((result) => {
            if (result == undefined) {
                throw `username tidak ada`
            }
            if (result.isLogin == true) {
                return Employee.update(`username`, username, `isLogin`, false)
            } else {
                throw `${username} is already logout`
            }
        }).then((result) => {
            if (result) View.successLogout(`${username} success logout`)

        }).catch((err) => {
            View.errorLogout(err)
        });
    }

}

module.exports = Controller