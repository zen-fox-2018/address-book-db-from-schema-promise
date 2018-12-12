const db = require("./connection.js")


function createEmployee() {

    let query =
        `CREATE TABLE Employees(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            position TEXT,
            username TEXT,
            password TEXT
        )`

    db.run(query, function (err) {
        if (err) throw err;
    })
}

function createPatient (){
    let query =
    `CREATE TABLE Patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        diagnosis TEXT
    )`

    db.run(query, function(err){
        if(err) throw err;
    })
}

function emptyEmployee(){
    let query = 
    `DELETE FROM Employees
    WHERE name IS NOT NULL`

    db.run(query, function(err){
        if(err) throw err;
    })
}

function addColumn(){
    let query =
    `ALTER TABLE Employees
    ADD COLUMN isLogin TEXT`

    db.run(query, function(err){
        if(err) throw err;
    })
}

function isLoginDefault(){
    let query = 
    `UPDATE Employees
    SET isLogin = 'false'`

    db.run(query, function(err){
        if(err) throw err;
    })
}

// createEmployee()
// createPatient()
// emptyEmployee()
// addColumn()
isLoginDefault()

