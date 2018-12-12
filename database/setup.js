
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database/hospital.db')

db.serialize(function(){
    db.run(`CREATE TABLE 'Employees' (
                         'id' INTEGER PRIMARY KEY AUTOINCREMENT,
                                    'name' varchar(25),
                                    'position' TEXT,
                                    'username' TEXT,
                                    'password' TEXT,
                                    'isLogin' INTEGER
                                    )`, function(err){
                                        if(err){
                                            console.log(err)
                                        }
       
                
        })

    db.run(`CREATE TABLE 'Patients' (
                                    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
                                    'name' varchar(25),
                                    'diagnose' varchar(25)
                                    )`, function(err){
                                        if(err){
                                            console.log(err)
                                        }
                                    })
})

module.exports = db