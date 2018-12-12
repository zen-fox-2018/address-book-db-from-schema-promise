const EmployeeController = require('./EmployeeController.js')

const argv = process.argv.slice(2)

const command = argv[0]
const options = argv.slice(1)

switch (command) {
  case "register":
    EmployeeController.register(options)
    break;

  case "login":
    EmployeeController.login(options)
    break;

  case "addPatient":
    EmployeeController.addPatient(options)
    break;

  case "logout":
    EmployeeController.logout()
    break;

  default: console.log(`Silahkan baca panduan untuk menggunakan sistem ini`);

}