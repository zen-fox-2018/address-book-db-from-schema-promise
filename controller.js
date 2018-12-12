const View = require('./view.js');
const Employee = require('./models/employee.js');
const Patient = require('./models/patient.js');

class Controller {

    static showAll() {
        Employee.findAll()
            .then((data) => {
                View.showData(data)
            }).catch((err) => {
                View.showErr(err);
            });
    }

    static register(name, position, username, password) {
        Employee.insert(name, position, username, password)

            .then(() => {
                View.registerOk({ name: name, password: password, role: position });
            }).catch((err) => {
                View.showErr(err);
            });
    }

    static login(username, password) {
        Employee.findOne('isLogin', 1)
            .then((employee) => {

                if (employee) {
                    throw 'Ada yang login!'
                } else {
                    return Employee.findOne('username', username);
                }
            })

            .then(result => {
                if (!result) {
                    throw 'username / password salah';
                } else {
                    if (password !== result.password) {
                        throw 'username / password salah';
                    } else {
                        return Employee.updateLogin(username);
                    }
                }
            })

            .then(update => {
                View.loginOk(update);
            })
            .catch((err) => {
                View.showErr(err);
            });

    }

    static showPatients() {
        Patient.findAll()
            .then((data) => {
                View.showData(data)
            }).catch((err) => {
                View.showErr(err);
            });
    }

    static addPatient(name, diagnosis) {

        Employee.findOne('isLogin', 1)
            .then((employee) => {

                if (employee.position === 'dokter') {
                    return Patient.insert(name, diagnosis);
                }
            })

            .then(() => {
                View.addPatient()
            })

            .catch((err) => {
                View.showErr(err);
            });
    }
}

module.exports = Controller;