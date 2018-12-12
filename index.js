
const args = process.argv.slice(2);
const command = args[0];
const Controller = require("./Controllers/controller");

switch (command) {
    case "register":
        Controller.register(args[1], args[2], args[3], args[4])
        break;
    case "login":
        Controller.login(args[1], args[2]);
        break;
    case "updated" :
        Controller.update(args[1], args[2], args[3]);
        break;
    case "delete" :
        Controller.delete(args[1])
    break;
    case "addPatient":
        
    default:
        break;
}