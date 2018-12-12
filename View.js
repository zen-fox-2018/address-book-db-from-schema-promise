class View {
  static registerSuccess(obj, totalEmployee) {
    console.log(`save data success ${JSON.stringify(obj)}. Total Employee : ${totalEmployee}`);
  }

  static error(err) {
    console.log(`Error`);
    console.log(err);
  }

  static loginSucces(username) {
    console.log(`user ${username} login successfully`);
  }

  static addPatientSuccess(totalPatient) {
    console.log(`patient data added successfully. Total patient: ${totalPatient}`);
  }

  static logoutSucces() {
    console.log(`logout successfully`);
  }
}

module.exports = View