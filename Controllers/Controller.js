const Employee = require('../Models/Employee')
const Patient = require('../Models/Patient')
const View = require('../Views/View')

class Controller {
  static register(input) {
    Employee.create(input)
      .then( output => {
        return Employee.findOne("id", output.lastID) 
      })
      .then( one => {
        View.success(`Save data success username: ${one.username}, pass: ${one.password}, role: ${one.role}. Total Employee ${one.id}`)
      })
      .catch( err => {
        if (err.errno){
          View.displayError('Regis gagal')
        }
      })
  }

  static login(input) {
    Employee.findOne("isLogged", 1)
      .then( userLogin => {
        if (userLogin === null) {
          return Employee.findOne("username", input[0])
        } else {
          throw { "msg": `Komputer sedang digunakan oleh ${userLogin.username}` }
        }
      })
      .then( userExist => {
        if (userExist !== undefined) {
          if (userExist.password === input[1]) {
            return  Employee.update(["isLogged", "isLogged"], [0, 1])
          } else {
            throw { "msg": 'User / pass salah' }
          }
        } else {
          throw { "msg": 'User / pass salah' }
        }
      })
      .then ( () => {
        View.success(`login berhasil, selamat datang ${input[0]}`)
      })
      .catch( err => {
        View.displayError(err.msg)
      })
  }

  static logout() {
    Employee.findOne("isLogged", 1)
      .then( userLogin => {
        if (userLogin !== null) {
          return Employee.update(["isLogged", "isLogged"], [1, 0])
        } else {
          throw { "msg": "Tidak ada yang sedang login" }
        }
      })
      .then( () => {
        View.success("Logout Berhasil")
      })
      .catch( err => {
        View.displayError(err.msg)
      })
  }

  static addPatient(input) {
    Employee.findOne("isLogged", 1)
      .then( userLogin => {
        if (userLogin !== null) {
          if (userLogin.role === 'dokter') {
            return Patient.create([input[0], input[1]])
          } else {
            throw { "msg": 'tidak memiliki akses untuk add patient' }
          }
        } else {
          throw { "msg": 'silakan login terlebih dahulu' }
        }
      })
      .then( sickPatient => {
        View.success(`Pasien ${sickPatient.name} berhasil ditambahkan, catatan : ${sickPatient.diagnosis}`)
      } )
      .catch( err => {
        View.displayError(err.msg)
      })
  }

  static commandError() {
    View.displayError('Command yg digunakan salah')
  }
}

module.exports = Controller

// Controller.register(["maman", 123456, "suster"])