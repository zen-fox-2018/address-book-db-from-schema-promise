const command = process.argv.slice(2)
const Controller = require('./Controller')
function commandCenter(command) {
    switch (command[0]) {
        case "findAllEmployee":
        Controller.findAllEmployee();
        break;
        case "delete":
        Controller.deleteData(command[1]);
        break;
        case "register":
        Controller.addEmployee(command[1], command[2], command[3], command[4]);
        break;
        case "login":
        Controller.login(command[1], command[2]);
        break;
        case "addPatient":
        Controller.addPatient(command[1], command.slice(1));
        break;
    }
    
}
commandCenter(command)