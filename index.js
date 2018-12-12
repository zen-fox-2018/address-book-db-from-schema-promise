const EmployeeController = require('./controllers/employee.js');
// const PatientController = require('./controllers/patient.js');

class Hospital {
  constructor(command) {
    this.command = command;
  }

  start() {
    switch (this.command[0]) {
      case 'listEmployees':
        EmployeeController.listAllEmployees();
        break;
      case 'register':
        EmployeeController.createEmployee(this.command.slice(1));
        break;
      case 'findEmployees':
        EmployeeController.findOne(this.command.slice(1));
        break;
      case 'login':
        console.log(this.command[0]);
        EmployeeController.loginEmployees(this.command[0], this.command.slice(1));
        break;
      case 'logout':
        console.log(this.command[0]);
        EmployeeController.loginEmployees(this.command[0], this.command.slice(1));
        break;
      case 'addPatient':
        EmployeeController.addPatient(this.command.slice(1));
        break;
      default:
    }
  }
}

const argv = process.argv.slice(2);
const hospital = new Hospital(argv);

hospital.start();
