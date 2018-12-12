var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Database/database.db');

function createTableEmployee() {
    let query = `
        CREATE TABLE IF NOT EXISTS Employees
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            position TEXT,
            username VARCHAR(20),
            password VARCHAR(20)
        )`
    runTheCommand(query).then(function() {
        console.log()
    })
    .catch(function(err) {
        console.log(err)
    })
    
}

function createTablePatient() {
    let query = `
        CREATE TABLE IF NOT EXISTS Patients
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            diagnosis TEXT
        )`
    runTheCommand(query).then(function() {
        console.log()
    })
    .catch(function(err) {
        console.log(err)
    })
}

function runTheCommand(query) {
    return new Promise(function(resolve, reject) {
        db.run(query, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    }) 
}

function alterTable() {
    let query = `
        ALTER TABLE Employees
        ADD COLUMN status TEXT`
    runTheCommand(query).then(function() {
        console.log()
    })
    .catch(function(err) {
        console.log(err)
    })
}
createTableEmployee();
createTablePatient();
// alterTable()