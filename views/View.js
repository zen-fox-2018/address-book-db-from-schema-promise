
class View {
    static showErr(err) {
        console.log(err);
    }
    static showData(data) {
        console.log(data);
    }
    static successLogin(name) {
        console.log(`user ${name} logged in successfully`);    
    }
    static successLogout(name) {
        console.log(`user ${name} logged out successfully`);
        
    }
    static showSuccess(dataLength) {
        console.log(`Berhasil menambahkan user. Total Employee : ${dataLength}`);
    }

    static successAddPatient(dataLength) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${dataLength}`);
        
    }
}

module.exports = View