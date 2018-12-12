const command = process.argv.slice(2)
const Controller  = require('./controller.js')

class Index {
    constructor(command){
        this.command = command
    }

     executeCommand(){
        switch (this.command[0]){
            case 'register': 
                Controller.register(this.command[1], this.command[2], this.command[3])
            break;
            case 'login':
                Controller.login(this.command[1], this.command[2])
            break;
            case 'addPatient':
                Controller.addPatient(this.command[1], this.command[2])
            break;
            case 'logout':
                Controller.logout()
            break;
        }
    }
}

let action = new Index(command)
action.executeCommand()

