// const db = require('./dbConnection')

// let qCreateEmployee = `
//   CREATE TABLE IF NOT EXISTS Employees (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username text,
//     password text,
//     role text,
//     isLogged INTEGER
//   )`

// let qCreatePatient = `
//   CREATE TABLE IF NOT EXISTS Patients (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name text,
//     diagnosis text
//   )`

// db.serialize( function() {
//   db.run(qCreateEmployee, (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('success')
//     }
//   })

//   db.run(qCreatePatient, (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('success')
//     }
//   })
// })

// db.close()