
const Employees = require("../Models/employee");
const Views = require("../Views/view");
const Patient = require("../Models/patient")

class Controller {
    static register(name, position, username, password) {
        let newData = new Employees(null, name, position, username, password);
        newData.create().then(() => {
            Views.showRegistered("You have successfully registered!");
        }).catch(err => {
            throw err
        })
    }

    static login(username, password) {

        // Employees.findOne("isLogin", 1).then(loggedIn => {
        //     return loggedIn
        // }).then(data => {
        //     Views.showError("Someone has already logged in!")
        // })

        Employees.findOne("username", username).then(rows => {
            return rows
        }).then(data => {
            if(data.password === password) {
                return data.update("isLogin", 1, data.id)
            } else {
                throw "Wrong username/password!"
            }
        }).catch(err => {
            throw err
        })
    }

    static update (column, value, id) {
        Employees.findOne("id", id).then(rows => {
            return rows
        }).then(data => {
            return data.update(column, value, data.id)
        }).then(changed => {
            Views.showUpdated(changed)
        }).catch(err => {
            throw err
        })
    }

    static delete(id) {
        Employees.delete(id).then(() => {
            Views.showDeleted("You have successfully deleted this person!")
        }).catch(err => {
            throw err
        })
    }

    static addPatient(name, diagnose) {
        Employees.findOne("isLogin", 1).then(loggedIn => {
            console.log(loggedIn)
        })
    }
}

module.exports = Controller