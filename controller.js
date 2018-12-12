const View = require('./view.js')
const Employee = require('./model/employee.js')
const Patient = require('./model/patient.js')

class Controller {
    static register(username, password, position) {
        let newEmployee = new Employee(username, position, username, password)

        Employee.insert(newEmployee)
        .then(() => {
            return Employee.findAll()
        })
        .then(allData =>{
            View.display(`save data success ${newEmployee}. Total Employee: ${allData.length}`)
            
        })
        .catch(err =>{
            View.error(err, "registration failed")
        })
    }

    static login(username, password) {

        var dataEmployee = null

        Employee.findWhere(username, 'username')
        .then(employeeData => {    
            if(employeeData.length == 0){
                throw('Anda belum terdaftar')
            }
            else if(employeeData[0].password !==password){
                throw('usename/password salah')
            }   else{
                dataEmployee = employeeData
                return Employee.findWhere(1, 'isLogin')
            }
        })
        .then(loginData => {
            if(loginData.length !== 0){
                throw('user lain sedang login')
            }   else{
                return Employee.update('isLogin', 1, dataEmployee[0].id)
            }
        })
        .then(() => {
            View.display(`user ${dataEmployee[0].name} logged in successfully`)
        })
        .catch(err => {
            View.error(err, 'login failed')
        })

    }

    static addPatient(patientName, diagnosis) {

        Employee.findWhere(1, 'isLogin')
        .then(loginData => {

            if(loginData.length == 0){
                throw('anda belum login')
            }   else{
                if(loginData[0].position!== 'dokter'){
                    throw('anda tidak memiliki akses untuk add patient')
                }   else{
                    let newPatient = new Patient(patientName, diagnosis)

                    return Patient.insert(newPatient)
                }
            }
        })
        .then(() =>{
            return Patient.findAll()

        })
        .then(allData => {
            View.display(`data pasien berhasil ditambahkan. Total data pasien: ${allData.length}`)
        })
        .catch(err => {
            View.error(err, 'add data failed')
        })
    }

    static logout(){
        var dataLogout = null

        Employee.findWhere(1, 'isLogin')
        .then(logoutData => {
            if(logoutData.length == 0){
                View.display('all users are logged out')
            }   else{
                dataLogout = logoutData[0]
                return Employee.update('isLogin', 'false', logoutData[0].id)
            }
        })
        .then(() => {
            if(dataLogout){
                View.display(`${dataLogout.name} logged out succesfully`)
            }  
        })
        .catch(err => {
            View.error(err, 'logout error')
        })

    }
}

module.exports = Controller
