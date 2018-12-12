const db = require('../database/connection.js')


class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.isLogin = 0
    }

    static findAll(){
        return new Promise(function(resolve, reject){

            let select = `SELECT * FROM Employees`
            db.all(select, function(err, data){
                if(err){
                    reject(err)
                }   else{
                    
                    let arrData = []
                    for(let i = 0; i < data.length; i++){
                        arrData.push(new Employee(data[i].name, data[i].position, data[i].username, data[i].password))
                    }
                    resolve(arrData)
                }
            })

        })
    }

    static findWhere(Column, condition){
        return new Promise(function(resolve, reject){

            let query = 
            `SELECT *
            FROM Employees
            WHERE '${Column}' = ${condition}`
    
            db.all(query, function(err, data){
                if(err){
                    reject(err)
                }   else{
                    resolve(data)
                }
            })
        })
    }

    static update(column, value, id){
        return new Promise(function(resolve, reject){
            let query = 
            `UPDATE Employees
            SET '${column}' = ${value}
            WHERE id = ${id}`
    
            db.run(query, function (err){
                if(err){
                    reject(err)
                }   else{
                    resolve(null)
                }
            })
        })
        
    }

    static insert(employee){
        return new Promise(function(resolve, reject){
            let query = 
            `INSERT INTO Employees 
            VALUES (null, '${employee.name}', '${employee.position}', '${employee.username}', '${employee.password}', 0)`
    
            db.run(query, function (err){
                if(err){
                    reject(err)
                }   else{
                    resolve()
                }
            })

        })
    }
}

module.exports = Employee
  