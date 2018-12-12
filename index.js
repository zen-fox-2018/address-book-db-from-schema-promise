console.clear()
const argv = process.argv.slice(2)
const command = argv[0]
const options = argv.slice(1)
const Controller = require(`./Controllers/Controller`)

switch (command) {
    case `register`:
        Controller.register(options[0], options[1], options[2])

        break;

    case `login`:
        Controller.login(options[0], options[1])

        break;

    case `addPatient`:
        Controller.addPatient(options[0], options.slice(1))
        break;
    
    case `logout`:
        Controller.logout(options[0])
        break;
}