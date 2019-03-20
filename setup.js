const db = require('./database/connector')

db.serialize(()=> {
    let qCreateEmployee = `CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        posisition VARCHAR(20),
        username VARCHAR(50),
        password VARCHAR(50));`
    db.run(qCreateEmployee,(err) => {
        if(err) console.log(err);
        else console.log('Success Create Table employees');
    })

    let qAlterEmployee = `ALTER TABLE employees 
                            ADD isLogin INTEGER;`
    db.run(qAlterEmployee, (err) => {
        if(err) console.log(err);
        else console.log('Success add isLogin in Employee');
        
    })

    let qCreatePatient = `CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        diagnosis VARCHAR(255));`
    db.run(qCreatePatient, (err)=> {
        if(err) console.log(err);
        else console.log('Success Create Table patients');
    })

})