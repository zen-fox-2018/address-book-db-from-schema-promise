const db = require('./db')

db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS Employees`)
    db.run(`DROP TABLE IF EXISTS Patients`)

    let employeeTable = 
    `CREATE TABLE Employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        username VARCHAR,
        password VARCHAR,
        position VARCHAR
    )`
    db.run(employeeTable, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log('Success create Employees Table!!')
        }
    })

    let PatientsTable = 
    `
    CREATE TABLE Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        diagnose text
    )
    `
    db.run(PatientsTable, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log('Success create Patients Table!!')
        }
    })

    let qAddColumnEmployee = 
    `ALTER TABLE Employees ADD COLUMN
    isLogin TEXT`
    db.run(qAddColumnEmployee, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log('Success add column isLogin to Employee Table')
        }
    })
})