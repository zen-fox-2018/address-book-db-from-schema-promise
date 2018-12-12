const argv = process.argv.slice(2)
const Controller = require('./controllers/Controller')
let input = null
switch (argv[0]) {
    case 'register':
        input = {
            name : argv[1],
            username : argv[2],
            password : argv[3],
            position : argv[4]
        }
        Controller.register(input)
    break;

    case 'login' :
        input = {
            username : argv[1],
            password : argv[2]
        }
        Controller.login(input)
    break;

    case 'logout' :
        input = {
            username : argv[1]
        }
        Controller.logout(input)
    break;

    case 'delete' :
        input = {
            username : argv[1]
        }
        Controller.delete(input)
    break;

    case 'registerPatient' :
        input = {
            name : argv[1],
            diagnose: argv[2]
        }
        Controller.registerPatient(input)
    break;
}