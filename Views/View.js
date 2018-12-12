class View {
    static successRegister(data) {
        console.log(data);

    }

    static errorRegister(data) {
        console.log(data);

    }

    static successLogin(msg) {
        console.log(msg);

    }

    static errorLogin(err) {
        console.log(err);
        
    }

    static successLogout(msg) {
        console.log(msg);

    }

    static errorLogout(err) {
        console.log(err);
        
    }

    static errorAddPatient(err) {
        console.log(err);
        
    }

    static successAddPatient(data) {
        console.log(data);
        
    }

}

module.exports = View