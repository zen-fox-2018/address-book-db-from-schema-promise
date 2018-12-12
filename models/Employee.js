const db = require('../database/connector')

class Employee {
    constructor(obj) {
      this.id = obj['id']
      this.name = obj['name']
      this.posisition = obj['posisition']
      this.username = obj['username']
      this.password = obj['password']
      this.isLogin = obj['isLogin']
    }

    static findByAll() {
        return new Promise ((resolve, reject)=> {
            db.all(`SELECT * FROM employees;`,(err,rows)=>{
                if(err) reject(err)
                else {
                    let result = []
                    for(let i = 0; i < rows.length; i++){
                        result.push(new Employee(rows[i]))
                    }
                    resolve(result)
                }
            })
        })
       
    }

    static CountEmployee () {
        return new Promise((resolve, reject)=> {
            db.get(`SELECT COUNT(*) AS total FROM employees;`, (err,rows)=> {
                if(err) reject(err)
                else resolve(rows)
            })
        })
       
    }

    static findOne(collums, value) {
       return new Promise((resolve, reject)=> {
        db.get(`SELECT * FROM employees
        WHERE ${collums} = ?`, value , 
        (err,data)=>{
            if(err) reject(err)
            else {
                resolve(data)
            }
        })
       }) 
    }

    static findById(id){
        return new Promise((resolve, reject)=> {
            db.get(`SELECT * FROM employees
                WHERE id = ?;`, id, (err,rows)=> {
                    if(err) reject(err)
                    else {
                        let result = new Employee(rows)
                        resolve(result)
                    }
                })
        })  
    }

    static insertDataEmployee(value){
        return new Promise((resolve, reject)=> {
            if(!value[0] || !value[1] || !value[2] || !value[3]) {
                reject('Data kurang lengkap')
            } else {
                db.run(`INSERT INTO employees VALUES (null, ? , ? , ? , ? , 0);`, value, (err)=>{
                    if(err) reject(err)
                    else resolve()
                })
            }
        })  
    }

    static updateData(id, value , fieldValue) {
        return new Promise((resolve, reject)=> {
            db.run(`UPDATE employees
            SET ${fieldValue} = ?
            where id =  ${id}`, value , (err) =>{
                if(err) reject(err)
                else resolve()   
            })
        })   
    }
    
  }

  module.exports = Employee