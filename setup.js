const db = require('./dbConnect.js');

let employee =
`
CREATE TABLE IF NOT EXISTS Employees
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    position VARCHAR(25),
    username VARCHAR(25),
    password VARCHAR(25),
    isLogin INTEGER
)
;`;

let patient =
`
CREATE TABLE IF NOT EXISTS Patients
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    diagnosis TEXT
)
;`;

db.serialize(() => {
    db.run(employee,(err) => {
        if (err) {
            throw err;
        } else {
            console.log(`Create table Employees`);
        }
    });

    db.run(patient,(err) => {
        if (err) {
            throw err;
        } else {
            console.log(`Create table Patients`);
        }
    });
});


db.close((err) => {
    if (err) {
        throw err;
    }
});