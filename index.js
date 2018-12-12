const argv = process.argv.slice(2)
const Controller = require('./controllers/Controller')
const EmpController = require('./controllers/EmpController')
const option = argv.slice(1)
switch (argv[0]) {
  case 'register':
    EmpController.register(option)
    break;
  case 'login':
    EmpController.login(option)
    break;
  case 'addPatient':
    EmpController.addPatient(option)
    break;
  case 'logout':
    EmpController.logout(option)
    break;  
  case 'delete':
    EmpController.delete(option)
    break;     
  default: Controller.help()
    break;
}
