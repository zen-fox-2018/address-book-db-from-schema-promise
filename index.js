const argv = process.argv.slice(2);
const Controller = require('./controller.js');

class Index {
    constructor(command) {
        this.command = command;
        this.helper();
    }

    helper() {
        switch (this.command) {
            case 'search':
                Controller.showAll()
                break;

            case 'register':
                Controller.register(argv[1], argv[2], argv[3], argv[4]);
                break;
            
            case 'login':
                Controller.login(argv[1], argv[2]);
                break;

            case 'showPatients':
                Controller.showPatients();
                break;
            
            default:
                
                break;
        }
    }
}

const index = new Index(argv[0]);