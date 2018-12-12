const db = require('../database/connection.js')


class Employees {
    constructor(obj) {
            this.name = obj.name
            this.position = obj.position
            this.username = obj.username
            this.password = obj.password
    }

    static findAll (input) {
        return new Promise(function(resolve,reject){
            db.all(`SELECT * FROM ${input}`, function(err,data){
                if(err){
                    reject(err)
                } else{
                    let tampung = []
                    for(let i = 0; i < data.length; i++){
                        tampung.push(new Employees(data[i]))
                    }
                    resolve(tampung)
                }
            })
        })
    }
    static countEmployee () {
        return new Promise(function(resolve,reject){
            db.all(`SELECT COUNT(*) AS total FROM Employees`, (err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
       
    }
    static create (input){
        return new Promise(function(resolve,reject){
            let query = `INSERT INTO Employees (name, position, username, password)
                                VALUES (
                                    "${input.name}",
                                    "${input.position}",
                                    "${input.username}",
                                    "${input.password}"
                                )`
            db.run(query,function(err){
                    if(err){
                       reject(err)
                    }else{
                        resolve()
                    }
            })
        })
    }

    static findWhere(input) {
        return new Promise((resolve,reject)=> {
            db.all(`SELECT * FROM Employees WHERE username = "${input.username}" AND password = "${input.password}"`,
            (err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
    static update(column,value,userId) {
        return new Promise((resolve,reject)=>{
            db.run(`UPDATE Employees
                    SET ${column} = ${value}
                    WHERE id = ${userId} `,
                    (err) => {
                      if(err) {
                        reject(err)
                      } else{
                          resolve()
                      }
                    })
        })
    }
    static findOne() {
        return new Promise((resolve,reject)=>{
            db.all(`SELECT * FROM Employees
                    WHERE isLogin = 1`, (err,data)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(data)
                        }
                    })
        })
    }
  
}

module.exports = Employees