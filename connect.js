const db = require(`./db`)

db.serialize(function () {
    let createEmployees = `CREATE TABLE IF NOT EXISTS Employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        username INTEGER,
        password TEXT,
        role TEXT,
        isLogin BOOLEAN
    );`

    let createPatient = `CREATE TABLE IF NOT EXISTS Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        name TEXT,
        disease TEXT
    );`

    db.run(createEmployees, function (err) {
        err && console.log(err);
    })

    db.run(createPatient, function (err) {
        err && console.log(err);
    })
})

db.close()