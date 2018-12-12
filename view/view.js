class View {
    static error(input){
        console.log(input)
    }
    static success(data,input){
        console.log(`save data success { username: ${input.username}, password: ${input.password}, role: ${input.position}}  total employee ${data[0].total}`)
    }
    static showAll(input) {
        console.log(input)
    }
    static login(input) {
        console.log(`user ${input[0].name} logged in succesfully`)
    }
    static logout() {
        console.log('user logout')
    }
   static creatPatient (total) {
       console.log(`data pasien berhasil ditambahkan. Total pasien : ${total}`)
   }
}
module.exports = View