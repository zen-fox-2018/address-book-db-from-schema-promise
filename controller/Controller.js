const Employee = require ('../models/Employee.js')
const Patient = require ('../models/Patient.js')
const View = require ('../views/View.js')

class Controller {
    static register (name, position, username, password) {
        Employee.findWhere('username', username)
            .then (function(data){
                if(data == undefined) {
                    return Employee.create(name, position, username, password)
                }else{
                    throw 'username sudah ada'
                }
            })
            .then (function(newAccount) {
                View.shows(newAccount)
            })
            .catch (function(err) {
                View.showError(err)
            })
    }

    static login (username, password) {
        Employee.findWhere('login', 'true')
            .then (function(data){
                if(data == undefined) {
                    return Employee.findWhere('username', username)
                }else {
                    throw 'harus logout terlebih dahulu'
                }
            })
            .then (function(accountLogin) {
                if(accountLogin.password == password){
                    return Employee.update('login','true', accountLogin.id)
                }else{
                    throw 'username / password salah'
                }  
            })
            .then(function(){
                View.shows(username, ' berhasil login')
            })
            .catch (function(err) {
                View.showError(err)
            })     
    }

    static addPatient (input) {
        let nama = input[0]
        let penyakit = input.slice(1)
        Employee.findWhere('login', 'true')
            .then (function(data) {
                if(data.position == "dokter") {
                    let id = data.id
                    return Patient.create(nama, penyakit, id)
                }else if (data == undefined) {
                    throw 'Harus Login terlebih dahulu'
                }else {
                    throw 'Anda tidak punya akses'
                }
            })
            .then (function(dataPasien) {
                View.shows(dataPasien)
            })
            .catch (function(err) {
                View.showError(err)
            }) 
    }

    static logout () {
        Employee.findWhere('login', 'true')
            .then (function(data) {
                if(data !== undefined) {
                    return Employee.update('login', 'false' , data.id)
                }else if (data == undefined) {
                    throw 'tidak ada yang login'
                }
            })
            .then (function(){
                View.shows('berhasil logout')
            })
            .catch (function(err) {
                View.showError(err)
            })
    }
}

module.exports = Controller;