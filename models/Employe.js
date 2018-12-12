const db = require('../database/connection.js')

class Employee {
    constructor(id, name, position, username, password, loginStatus){
        this.id = id
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.loginStatus = loginStatus
    }

    

    // static readAllData(cb){
    //     let query = `SELECT * FROM Employees`
    //     db.all(query, function(err, rows){
    //         if(err){
    //             cb(err, null)
    //         }
    //         else {                
    //             //yang ditampilkan adalah array object class
    //             let newRows = []
    //             for (let i = 0; i < rows.length; i++){
    //                 newRows.push(new Employee(rows[i].id, rows[i].name, rows[i].position, rows[i].username, rows[i].password, rows[i].loginStatus))
    //             }
    //             cb(null,newRows)
    //         }
    //     })
    // }

    static readAllData(){
        let query = `SELECT * FROM Employees`
        let promise = new Promise(function(resolve,reject){
            db.all(query, function (err,rows){
                if(err){
                    reject(err)
                }
                else {
                    // resolve(rows)
                    let newRows = []
                    for (let i = 0; i < rows.length; i++){
                        newRows.push(new Employee(rows[i].id, rows[i].name, rows[i].position, rows[i].username, rows[i].password, rows[i].loginStatus))
                    }
                    resolve(newRows)
                }
            })
        })
        return promise
    }

    // static createRows(entryData,cb){
    //     let query = `INSERT INTO Employees(name, position, username, password, loginStatus)
    //     VALUES (
    //         "${entryData.name}",
    //         "${entryData.position}",
    //         "${entryData.username}",
    //         "${entryData.password}",
    //         ${entryData.loginStatus}
    //     )`
    //     db.run(query, function(err){
    //         if(err){
    //             cb(err)
    //         }
    //         else {
    //             cb(null)
    //         }
    //     })
    // }

    // static createRowPatient(dataPasien,cb){
    //     let query = `INSERT INTO Patients (name, diagnosis)
    //     VALUES (
    //         "${dataPasien.name}",
    //         "${dataPasien.diagnosis}"
    //     )`
    //     db.run(query, function(err){
    //         if(err){
    //             cb(err)
    //         }
    //         else {
    //             cb()
    //         }
    //     })
    // }

    static createRowPatient(dataPasien){
        let query = `INSERT INTO Patients (name,diagnosis)
        VALUES (
            "${dataPasien.name}",
            "${dataPasien.diagnosis}"
        )`
        return new Promise((resolve,reject)=>{
            db.run(query, function(err){
                if(err){
                    reject(err)
                }
                else {
                    resolve()
                }
            })
        })
    }

    static createRows(entryData){
        let query = `INSERT INTO Employees (name, position, username, password, loginStatus)
        VALUES (
            "${entryData.name}",
            "${entryData.position}",
            "${entryData.username}",
            "${entryData.password}",
            ${entryData.loginStatus}
        )`
        return new Promise (function(resolve,reject){
            db.run(query, function(err){
                if(err){
                    reject(err)
                }
                else {
                    resolve(null)
                }
            })
        })
    }

    // static deleteRow(id,cb){
    //     let query = `DELETE FROM Employees WHERE id = ${id}`
    //     db.run(query, function(err){
    //         if(err){
    //             cb(err)
    //         }
    //         else {
    //             cb(null)
    //         }
    //     })
    // }

    static deleteRow(id){
        let query = `DELETE FROM Employees WHERE id = ${id}`
        return new Promise(function(resolve,reject){
            db.run(query, function(err){
                if(err){
                    reject(err)
                }
                else {
                    resolve(null)
                }
            })
        })
    }

    // static updateRow(namaKolom, updateValue, id,cb){
    //     let query = `UPDATE Employees SET ${namaKolom} = ${updateValue} where id = ${id}`
    //     db.run(query, function(err){
    //         if(err){
    //             cb(err)
    //         }
    //         else {
    //             cb(null)
    //         }
    //     })
    // }

    static updateRow(namaKolom, updateValue, id){
        let query = `UPDATE Employees SET ${namaKolom} = ${updateValue} where id = ${id}`
        return new Promise((resolve,reject)=>{
            db.run(query, function(err){
                if(err){
                    reject(err)
                }
                else {
                    resolve(null)
                }
            })
        })
    }

    // static findById(namaKolom,id,cb){
    //     let query = `SELECT ${namaKolom} FROM Employees WHERE id = ${id} `
    //     db.all(query, function(err,rows){
    //         if(err){
    //             cb(err,null)
    //         }
    //         else {
    //             cb(null, rows)
    //         }
    //     })
    // }

    static findById(namaKolom, id){
        let query = `SELECT ${namaKolom} FROM Employees WHERE id = ${id}`
        return new Promise((resolve,reject)=>{
            db.all(query,function(err,rows){
                if(err){
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })
        })
    }

    // static findByWhere(namaKolom, whereKolom, whereValue, cb ){
    //     let query = `SELECT ${namaKolom} FROM Employees WHERE ${whereKolom} = "${whereValue}"`
    //     db.all(query, function(err,rows){
    //         if(err){
    //             cb(err,null)
    //         }
    //         else {
    //             cb(null,rows)
    //         }
    //     })
    // }

    static findByWhere(namaKolom, whereKolom, whereValue){
        let query = `SELECT ${namaKolom} FROM Employees WHERE ${whereKolom} = "${whereValue}"`
        return new Promise((resolve,reject)=>{
            db.all(query, function(err,rows){
                if(err){
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })
        })
    }


}

module.exports = Employee

// Employee.updateRow('loginStatus',0,3,function(err){
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log('sukses')
//     }
// })

// Employee.findByWhere('id,username,password','loginStatus',0, function(err,rows){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(rows)
//     }
// })