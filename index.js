const command = process.argv.slice(2)
const HospitalController = require('./controller/Controller.js')

class Index {
    constructor(command){
        this.command = command
    }

    goIndex(){
        switch (this.command[0]) {
            case 'showAll':
                HospitalController.showAllData(command[1])
                break;
            case `register`:
                HospitalController.addEmployee(command[1], command[2], command[3], command[4], command[5])
                break;
            case `delete`:
                HospitalController.deleteEmployee(command[1])
                break;
            case `login`:
                HospitalController.loginEmployee(command[1], command[2])
                break;
            case `logout`:
                HospitalController.logoutSystem()
                break;
            case `addPatient`:
                let nama = command[1]
                let diagnosis = command.slice(2).join(', ')
                HospitalController.addPatient(nama, diagnosis)
                break;
            default:
                break;
        }
    }
}

let userz = new Index(command)
userz.goIndex()
