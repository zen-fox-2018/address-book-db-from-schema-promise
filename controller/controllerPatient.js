const View = require('../view/viewPatient.js')
const Model = require('../model/modelPatient.js')

class Controller {
  static addPatient(name, diagnosis) {
    Model.employeeLoginCheck('isLogin', 1)
    .then((cekLogin) => {
      if (cekLogin.length === 0) {
        throw `Silahkan login terlebih dahulu`
      }
      if (cekLogin[0].role === 'dokter') {
        return Model.registerPatient(name, diagnosis)
      } else {
        throw 'Tidak memiliki akses untuk menambahkan pasien.'
      }
    })
    .then((dokterIn) => {
      return Model.countPatient()
    })
    .then((lengthAllPatient) => {
      View.addPatientSucceed(lengthAllPatient)
    })
    .catch((err) => {
      View.accessDenied(err)
    })
  }
}

module.exports = Controller
