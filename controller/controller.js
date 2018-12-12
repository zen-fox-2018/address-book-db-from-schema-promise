const Employees =  require('../model/employees.js')
const View = require('../view/view.js')
const Patients = require('../model/patients.js')

class Controller {
    static  register(input){
        Employees.create (input)
        .then(function(){  
            return Employees.countEmployee()      
        })
        .then((data)=>{
            View.success(data,input)
        })      
        .catch(function(err){
            View.error(err)
        })
                 
    }
    static findAll (input){
        Employees.findAll(input)
        .then((data) =>{
            View.showAll(data)
        })
        .catch((err)=>{
            View.error(err)
        })
    }
    static login(input) {
        let newdata = '' 
        Employees.findOne()
        .then((data)=>{
            if(data.length == 0){
              return Employees.findWhere(input) 
            }else{
                throw 'user lain belum logout'
            }         
        })
        .then((dataEmployee)=>{
            newdata = dataEmployee
            return Employees.update('isLogin',1,dataEmployee[0].id)
        })
        .then(()=>{
            View.login(newdata)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    static logout() {
        Employees.findOne()
        .then((data)=>{
            return Employees.update('isLogin',null,data[0].id)
        })
        .then(()=>{
            View.logout()
        })
        .catch((err)=> {
            View.error(err)
        })
      
    }
    static addPatients (input) {
        Employees.findOne()
        .then((data)=>{
            if(data[0].position == 'dokter'){
                return Patients.create(input)
            }
            else {
                throw "user tidak memiliki akses untuk menambahkan pasien"
            }
        })
        .then(()=>{
            return Patients.countPatients()
        })
        .then((data)=>{
            View.creatPatient(data[0].total)
        })
        .catch((err) => {
            View.error(err)
        })
    }
}

module.exports = Controller