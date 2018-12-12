
const Controller =  require('./Controller.js')

class Index {
    constructor (command) {
        this.command = command
    }

    getCommand () {
        switch (this.command[0]) {
            case 'Register': Controller.register(this.command[1], this.command[2], this.command[3], this.command[4])
                break;
            case 'Login' : Controller.login(this.command[1], this.command[2])
                break;
            case 'AddPatient' : Controller.addPatient(this.command.slice(1))
                break;
            case 'Logout' : Controller.logout()
                break;
            default: console.log('cek')
                break;
        }
    }
}

let argv = process.argv.slice(2)
let index = new Index (argv)
index.getCommand()