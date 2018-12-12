class View {

    static showData(data) {
        console.log(data);
    }

    static showErr(err) {
        console.log(err);
    }

    static registerOk(dataRegis) {
        console.log(`save data success ${dataRegis}`);
    }

    static loginOk(username) {
        console.log(`user ${username} logged in successfully`)
    }

    static addPatient() {
        console.log('success add data patient')
    }
}

module.exports = View;