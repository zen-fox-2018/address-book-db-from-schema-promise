const db = require('./db.js')

function createTable (query) {
    db.run(query , function (err) {
        if (err) {
            console.log("error di create Table",err)
        } else {
            console.log('berhasil create table')
        }
    })
}

function addColumn (query) {
    db.run(query, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("sukses add column")
        }
    })
}

const createEmployee = 
`CREATE TABLE IF NOT EXISTS Employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(20),
    role VARCHAR(20)
)`

const createPatient = 
`CREATE TABLE  IF NOT EXISTS Patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    diagnosis TEXT
)`

const AlterTable = `
ALTER TABLE Employees
ADD Column login INTEGER`

db.serialize(function () {
    
    createTable(createEmployee)
    createTable(createPatient)
    addColumn(AlterTable)

})
db.close()