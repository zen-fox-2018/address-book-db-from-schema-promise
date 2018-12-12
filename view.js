class view {
    static showAllEmployee(data) {
        console.log(data)
    }

    static showAllEmployeeFailed(err) {
        console.log(err)
    }   

    static registrationSucceed(data) {
        let theData = JSON.stringify(data[data.length-1])
        console.log(`save data success ${theData}. Total employee :${data.length}`)
    }

    static registrationFailed(err) {
        console.log(err)
    }

    static deleteSucceed() {
        console.log("delete succeed")
    }

    static deleteFailed(err) {
        console.log(err)
    }

    static loginSucceed(name) {
        console.log(`user ${name} logged in successfully`);
    }

    static loginFailed() {
        console.log('username / password wrong')
    }
    
    static cantlogin() {
        console.log('max login reached')
    }

}
module.exports = view