class View {
  static registerSuccess(obj, totalEmployee) {
    console.log(`save data success ${JSON.stringify(obj)}. Total Employee : ${totalEmployee}`);
  }

  static error(err) {
    console.log(`Error`);
    console.log(err);
  }

  static loginFailed() {
    console.log(`masih ada yang login, harap logout dulu`);
  }

  static wrongUsername() {
    console.log(`Username tidak terdaftar`);
  }

  static wrongPassword() {
    console.log(`Password anda salah, coba ingat-ingat`);
  }

  static loginSucces(username) {
    console.log(`user ${username} login successfully`);
  }

  static pleaseLogin() {
    console.log(`you must login to add patient`);
  }

  static pleaseLoginDoctor() {
    console.log(`please login as a doctor to add patient`);
  }

  static addPatientSuccess(totalPatient) {
    console.log(`patient data added successfully. Total patient: ${totalPatient}`);
  }

  static alreadyLogout() {
    console.log(`you are already logout`);
  }

  static logoutSucces() {
    console.log(`logout successfully`);
  }

  static logoutFailed() {
    console.log(`something wrong`);
  }
}

module.exports = View