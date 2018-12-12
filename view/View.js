class View {
    static showErrorMessage(msg){
        console.log(`this is error message detail : ${msg}`)
    }

    static showMessage(data){
        console.log(data)
    }

    static showRegisterSuccess(data){
        let totalData = data.length
        let indeks = data.length-1
        console.log(`register employee success with name ${data[indeks].name} and position ${data[indeks].position}`)
        console.log(`total data employee : ${totalData}`)
    }

    static showDeleteSuccess(data){
        let totalData = data.length
        console.log(`delete data success`)
        console.log(`total data employee : ${totalData}`)
    }

    static showSuccessLogin(){
        console.log(`sukses login`)
    }

    static showRegisterPatientSuccess(data){
        let totalData = data.length
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${totalData}`)
    }
}

module.exports = View