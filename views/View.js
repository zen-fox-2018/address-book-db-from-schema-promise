class View {

    static register(data, total) {
        console.log(`save data success ${JSON.stringify(data)}. Total employee: ${total}`);
    }

    static login(username) {
        console.log(`user ${username} logged in successfully`);
    }

    static logout(username) {
        console.log(`user ${username} logged out successfully`);
    }

    static displayError(err) {
        console.log(err);
    }

    static displayPatient(total) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien: ${total}`);
    }

}

module.exports = View