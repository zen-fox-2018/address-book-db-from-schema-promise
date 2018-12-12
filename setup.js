const db = require ('./database/connection.js')

function setupDatabaseEmployee(){
    let query = `CREATE TABLE IF NOT EXISTS
                Employees (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name text,
                    position varchar(50),
                    username varchar(50),
                    password varchar(50)
                )`
    db.run(query, function(err){
        if(err){
            console.log('error setup employee',err)
        }
        else {
            console.log(`success creating Employee`)
        }
    })
}

function setupDatabasePatient(){
    let query = `CREATE TABLE IF NOT EXISTS
                Patients (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name text,
                    diagnosis text
                )`
    db.run(query, function(err){
        if(err){
            console.log(`error setup employee`, err)
        }
        else {
            console.log(`success creating Patient`)
        }
    })
}

function addColumn(tableName, columnName, columnType){
    let query = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`
    db.run(query, function(err){
        if(err){
            console.log(`error add column`,err)
        }
        else {
            console.log(`success adding Column`)
        }
    })
}

function runSetup(){
    db.serialize(function(){
        setupDatabaseEmployee()
        setupDatabasePatient()
        
    })
}

// runSetup()

// addColumn('Employees', 'loginStatus','text')