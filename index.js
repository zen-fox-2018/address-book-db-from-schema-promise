const EmployeeController = require('./controllers/EmployeeController')
const argv = process.argv.slice(2)
let command = argv[0]
let input = argv.slice(1)

switch (command) {
    case "register":
        EmployeeController.register(input)
        break;
    case "login" :
        EmployeeController.login(input)
        break;
    case "addPatient":
        EmployeeController.AddPatient(input)
        break;
    case "logout" :
        EmployeeController.logout()
        break;
    default:
        break;
}