const Controller = require('./controllers/Controller')
const argv = process.argv.slice(2)
let command = argv[0]


switch (command) {
    case 'register':
        Controller.registerData(argv[1] ,argv[2], argv[3], argv[4])
        break;
    case 'searchEmployee':
        Controller.searchEmployee()
        break;
    case 'searchPatient':
        Controller.searchPatient()
        break;
    case 'login':
        Controller.loginEmployee(argv[1], argv[2])
        break;
    case 'addPatient':
        let diagnosa = argv.slice(2).join(',')
        Controller.addPatient(argv[1], diagnosa)
        break;
    case 'logout':
        Controller.logoutEmployee()
        break;
}