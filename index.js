const Controller = require('./Controllers/Controller')
const argv = process.argv.slice(2)

class Index { 
  static start(command) {
    switch(command[0]) {
      case 'register':
        Controller.register([command[1], command[2], command[3]])
        break;
      case 'login':
        Controller.login([command[1], command[2]])
        break;
      case 'addPatient':
        Controller.addPatient([command[1], command[2]])
        break;
      case 'logout':
        Controller.logout()
        break;
      default:
        Controller.commandError()
        break;
        
    }
  }
}

Index.start(argv)