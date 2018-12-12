const db = require('./db') 
let qEmp = `
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(20) UNIQUE,
  position VARCHAR(25),
  password VARCHAR(25)
  )
`
let qPat = `
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(25),
  diagnosis TEXT
  )
`

let qLogin = `
ALTER TABLE employees 
ADD COLUMN login INTEGER DEFAULT 0
`

function setUp(query) {
  db.run(query, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log(`Success make table`)
    }
  })
}

db.serialize((err) => {
  if(err) {
    console.log(err)
  } else {
    setUp(qEmp)
    setUp(qPat)
    setUp(qLogin)
  }
})
db.close()