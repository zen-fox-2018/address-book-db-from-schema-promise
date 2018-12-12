const db = require('./db')

let qEmployees = `
CREATE TABLE IF NOT EXISTS Employees
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR UNIQUE,
    password VARCHAR,
    role VARCHAR
)`

let qPatients = `
CREATE TABLE IF NOT EXISTS Patients
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    diagnosis TEXT
)`

let addColumn = `
ALTER TABLE Employees ADD COLUMN status INTEGER;`

db.serialize(() => {
    db.run(qEmployees, (err) => {
        err ? console.log(err): console.log('success make Employees table')
    })
    db.run(qPatients, (err) => {
        err ? console.log(err): console.log('success make Patients table') 
    })
    db.run(addColumn, (err) => {
        err ? console.log(err): console.log('success add status column to Employees');
    })
})