const Employee = require('../models/Employee')
const Patient = require('../models/Patient')
const View = require('../views/View')

class EmpController {
  static register(input) {
    if(input.length !== 3) {
      View.disErr(`INVALID INPUT !`)
    } else {
      let obj = {
        username: input[0],
        password: input[1],
        position: input[2]
      }
      let newEmp = new Employee(obj)
  
      newEmp.save()
        .then(dataThis => {
          return Employee.findOne({where: 'id', value: dataThis.lastID})
        })
        .then(dataEmp => {
          View.display(`save data`, dataEmp)
          return Employee.count()
        })
        .then(total => {
          View.display(`Total employee: `, total.total)
        })
        .catch(err => {
          if(err.code == 'SQLITE_CONSTRAINT' ) {
            View.disErr(`username must be unique !`)
          } else {
            View.disErr(err)
          }
        })
    }
  }

  static login(input) {
    if(input.length !== 2) {
      View.disErr(`INVALID INPUT !` )
    } else {
      let uname = input[0]
      let pass = input[1]

      Employee.findOne({where: 'login', value: 1})
        .then(data => {
          if(data !== null) {
            throw `${data.username} login already`
          } else {
            return Employee.findOne({where: 'username' , value: uname})
          }
        })
        .then(dataEmp => {
          if(dataEmp) {
            if(dataEmp.password !== pass) {
              throw `WRONG PASSWORD ${dataEmp.username}`
            } else {
              let obj = {
                set: 'login',
                where: 'username',
                val: 1
              }
              return dataEmp.update(obj)
            }
          } else {
            throw `Username not found`
          }
        })
        .then(dataThis => {
          View.display(`login user: `, uname)
        })
        .catch(err => {
          View.disErr(err)
        })
    }
  }

  static logout(username) {
    let obj = {
      where: 'username',
      value: username[0]
    }
    Employee.findOne(obj)
      .then(dataIn => {
        if(!dataIn) {
          throw `Username not found`
        } else {
          if (dataIn.login == 0) {
            throw `You didn't login! `
          } else {
            return dataIn.update({set: 'login', where:'username', val: 0})
          }
        }
      })
      .then(dataUp => {
        View.display(`${username[0]} successfully logout!`)
      })
      .catch(err => {
        View.disErr(err)
      })
  }

  static addPatient(input) {
    Employee.findOne({where: 'login', value: 1})
      .then(dataLogin => {
        if(!dataLogin) {
          throw `Login first!`
        } else {
          if(dataLogin.position !== 'dokter'){
            throw `Only doctor have permission to add Patient!`
          } else {
            let obj = {
              name: input[0],
              diagnosis: input.slice(1).join(', ')
            }
            let newPat = new Patient(obj)
            return newPat.save()
          }
        }
      })
      .then(dataSave => {
        View.display(`adding patient `)
      })
      .catch(err => {
        View.disErr(err)
      })
  }

  static delete(id) {
    Employee.findOne({where: 'login', value: 1})
    .then(dataLogin => {
      if(!dataLogin) {
        throw `Login first!`
      } else {
        if(dataLogin.position !== 'dokter'){
          throw `Only doctor have permission to add Patient!`
        } else {
          // console.log(id)
          return Patient.findOne({where: 'id', value: Number(id)})
        }
      }
    })
    .then(dataPat => {
      if(!dataPat) {
        throw `Patient not found!`
      } else {
        return dataPat.delete({where: 'id'})
      }
    })
    .then(dataDel => {
      View.display(`deleting patient `)
    })
    .catch(err => {
      View.disErr(err)
    })
  }
}
module.exports = EmpController