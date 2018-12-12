const argv = process.argv.slice(2)
const command = argv[0]

const ControllerEmployee = require('./controllers/ControllerEmployee')

switch (command) {
    case 'register':
        var obj = {
            username: argv[1],
            password: argv[2],
            role: argv[3]
        }
        ControllerEmployee.register(obj)
        break;

    case 'login':
        obj = {
            username: argv[1],
            password: argv[2]
        }
        ControllerEmployee.login(obj)
        break;

    case 'logout':
        obj = {
            username: argv[1]
        }
        ControllerEmployee.logout(obj)
        break;

    case 'addPatient':
        obj = {
            name: argv[1],
            diagnosis: argv.slice(2)
        }
        ControllerEmployee.addPatient(obj)
        break;

    default:
        
        break;
}