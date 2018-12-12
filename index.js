const argv = process.argv.slice(2)
const Controller = require('./controller/controllerEmployee.js')
const PatientController = require('./controller/controllerPatient.js')
const command = argv[0]

switch (command) {
    case 'findAll':
        Controller.search()
        break;
    case 'register':
        Controller.register(argv[1], argv[2], argv[3], argv[4])
        break;
    case 'login':
        Controller.login(argv[1], argv[2])
        break;
    case 'delete':
        Controller.delete(argv[1])
        break;
    case 'addPatient':
        PatientController.addPatient(argv[1], argv.slice(3, argv.length - 1))
        break;
    default:
        break;
}
