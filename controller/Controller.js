const Employee = require('../models/Employe.js')
const Patient = require('../models/Patient.js')
const View = require('../view/View.js')
class HospitalController {

    // static loginEmployee(username, password){
    //     //jika user memasukkan username password ada skenario
    //     //1. jika ada yang sedang login maka tidak bisa masuk
    //     //2. selain itu maka cek username password, jika cocok maka bisa masuk
    //     Employee.findByWhere('loginStatus', 'loginStatus', 1 , function(err,rows){
    //         if(err){
    //             View.showErrorMessage(err)
    //         }
    //         else {
    //             if(rows.length > 0 ){
    //                 View.showMessage(`sedang ada user lain yang login`)
    //             }
    //             else {
    //                 Employee.findByWhere('id,username,password','loginStatus', 0, function(err,rows){
    //                     if(err){
    //                         View.showErrorMessage(err)
    //                     }
    //                     else {
    //                         let cekLogin = false
    //                         let indeks = 0
    //                         for(let i = 0; i < rows.length; i++){
    //                             if(username === rows[i].username && rows[i].password === password) {
    //                                 cekLogin = true
    //                                 indeks = i
    //                             }
    //                         }
    //                         if(cekLogin === true){
    //                             Employee.updateRow('loginStatus',1,rows[indeks].id,function(err){
    //                                 if(err){
    //                                     View.showErrorMessage(err)
    //                                 }
    //                                 else {
    //                                     View.showSuccessLogin()
    //                                 }
    //                             })
    //                         }
    //                         else {
    //                             View.showMessage(`username/password wrong`)
    //                         }
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // }

    static logoutSystem(){
        Employee.findByWhere('id', 'loginStatus', 1)
        .then ((rows)=>{
            // console.log(rows[0].id)
            let id = rows[0].id
            return Employee.updateRow('loginStatus', 0 , id)
        })
        .then(()=>{
            View.showMessage(`user telah logout dari sistem`)
        })
        .catch((err)=>{
            View.showErrorMessage(err)
        })
    }

    static loginEmployee(username, password) {
        Employee.findByWhere('loginStatus', 'loginStatus', 1)
            .then((rowsa) => {
                if (rowsa.length > 0) {
                    // View.showMessage(`sedang ada user lain yang login`)
                    throw `sedang ada user lain yang login`
                }
                else {
                    return Employee.findByWhere('id,username,password', 'loginStatus', 0)
                }
            })
            .then((rows) => {
                let cekLogin = false
                let indeks = 0
                for (let i = 0; i < rows.length; i++) {
                    if (username === rows[i].username && rows[i].password === password) {
                        cekLogin = true
                        indeks = i
                    }
                }
                if (cekLogin === true) {
                    return Employee.updateRow('loginStatus', 1, rows[indeks].id)                    
                }
                else {
                    // View.showMessage(`username/password wrong`)
                    throw `username/password wrong`
                }
            })
            .then(()=>{
                View.showSuccessLogin
            })
            .catch((err)=>{
                View.showErrorMessage(err)
            })
    }

    // static deleteEmployee(id){
    //     Employee.deleteRow(id, function(err){
    //         if(err){
    //             View.showErrorMessage(err)
    //         }
    //         else {
    //             Employee.readAllData(function(err,rows){
    //                 if(err){
    //                     View.showErrorMessage(err)
    //                 }
    //                 else {
    //                     View.showDeleteSuccess(rows)
    //                 }
    //             })
    //         }
    //     })
    // }

    static deleteEmployee(id) {
        Employee.deleteRow(id)
            .then(() => {
                return Employee.readAllData()
            })
            .then((rows) => {
                View.showDeleteSuccess(rows)
            })
            .catch((err) => {
                View.showErrorMessage(err)
            })
    }

    // static addEmployee(name, position, username, password, loginStatus){
    //     let objEmp = {
    //         name : name,
    //         position:position,
    //         username:username,
    //         password:password,
    //         loginStatus: loginStatus
    //     }
    //     Employee.createRows(objEmp, function(err){
    //         if(err){
    //             View.showErrorMessage(err)
    //         }
    //         else {
    //             Employee.readAllData(function(err,rows){
    //                 if(err){
    //                     View.showErrorMessage(err)
    //                 }
    //                 else {
    //                     View.showRegisterSuccess(rows)
    //                 }
    //             })
    //         }
    //     })
    // }

    // static addPatient(name,diagnosis){
    //     Employee.findByWhere('position,loginStatus', 'loginStatus', 1, function(err, rows){
    //         if(err){
    //             View.showErrorMessage(err)
    //         }
    //         else {
    //             if(rows.length === 0) {
    //                 View.showMessage(`harap login terlebih dulu`)
    //             }
    //             else {
    //                 if(rows[0].position == 'dokter'){
    //                     let objPat = {
    //                         name : name,
    //                         diagnosis : diagnosis
    //                     }
    //                     Employee.createRowPatient(objPat, function(err){
    //                         if(err){
    //                             View.showErrorMessage(err)
    //                         }
    //                         else {
                                
    //                             Patient.readAllData(function(err,rows){
    //                                 if(err){
    //                                     View.showErrorMessage(err)
    //                                 }
    //                                 else {
    //                                     View.showRegisterPatientSuccess(rows)
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 }
    //                 else {
    //                     View.showMessage(`tidak memiliki akses untuk add patient`)
    //                 }
    //             }
    //         }
    //     })
        
    // }

    static addPatient(name,diagnosis){
        Employee.findByWhere('position,loginStatus','loginStatus', 1)
        .then((rows)=>{
            if(rows.length == 0){
                throw `harap login terlebih dahulu`
            }
            else {
                if(rows[0].position == 'dokter'){
                    let objPat = {
                        name : name,
                        diagnosis : diagnosis
                    }
                    return Employee.createRowPatient(objPat)
                    
                }
                else {
                    throw `tidak memiliki akses untuk add patient`
                }
            }
        })
        .then(()=>{
            return Patient.readAllData()
        })
        .then((rows)=>{
            View.showRegisterPatientSuccess(rows)
        })
        .catch((err)=>{
            View.showErrorMessage(err)
        })
    }

    static addEmployee(name, position, username, password, loginStatus) {
        let objEmp = {
            name: name,
            position: position,
            username: username,
            password: password,
            loginStatus: loginStatus
        }
        Employee.createRows(objEmp)
            .then(() => {
                return Employee.readAllData()
            })
            .then((rows) => {
                View.showRegisterSuccess(rows)
            })
            .catch((err) => {
                View.showErrorMessage(err)
            })
    }

    // static showAllData(){
    //     Employee.readAllData(function(err,rows){
    //         if(err){
    //             View.showErrorMessage(err)
    //         }
    //         else {
    //             View.showMessage(rows)
    //         }
    //     })
    // }

    static showAllData() {
        Employee.readAllData()
            .then(function (newRows) {
                View.showMessage(newRows)
            })
            .catch(function (err) {
                View.showErrorMessage(err)
            })
    }
}

module.exports = HospitalController