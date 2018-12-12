const Controller = require('./controller/controller.js')


const command = process.argv.slice(2)

switch (command[0]) {
    

    case "register":
    let obj = {}
    obj.name = command[1],
    obj.position = command[2],
    obj.username = command[3],
    obj.password = command[4]
        Controller.register(obj)
        break;


    case "login":
    let objLogin = {}
    objLogin.username = command[1],
    objLogin.password = command[2]
    
        Controller.login(objLogin)
        break;
    
    case "logout":

        Controller.logout()
        break;

    case "addpatient":
    let objPatient = {}
    objPatient.name = command[1],
    objPatient.diagnose = command[2]

        Controller.addPatients(objPatient)
        break;
  
    case "findbyid":
        Controller.findById(command[1])
    default:
        break;
}