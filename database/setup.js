const db = require ('./db.js')



const qEmployee = `
        CREATE TABLE IF NOT EXISTS Employees 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            position text,
            username text,
            password text
        )
        `

const qPatients = `
        CREATE TABLE IF NOT EXISTS Patients
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            diagnosis text,
            doctorId INTEGER,
            FOREIGN KEY (doctorId) REFERENCES Employees(id)
        )
        `



function createTable (nameTable) {
    db.run(nameTable, function(err){
        if(err) {
            console.log(err)
        }else{
            console.log(`sucsess`)
        }
    })
}

function insertField (nameTable, field, typeField) {
    let query = `
                ALTER TABLE  ${nameTable}
                ADD ${field} ${typeField};
    `
    db.run(query, function(err){
        if(err) {
            console.log(err)
        }else{
            console.log(`sucsess`)
        }
    })
}


function rusSetup () {
    db.serialize (function() {
        // createTable(qEmployee)
        // createTable(qPatients)
        // insertField('Employees', 'login', 'text')
        db.close()
    })
}

rusSetup()


