class View {
  static help() {
    console.log(`
    =================== AVAILABLE COMMAND =================
    node index.js register <username> <password> <position>
    node index.js login <username> <password>
    node index.js addPatient <patient_name> <diagnosis>
    node index.js logout <username>
    node index.js delete <patientid>
    =======================================================
    `)
  }

  static disErr(msg , err) {
    if(err) {
      console.log(`Error : `, msg, err)
    } else {
      console.log(`Error : `, msg)
    }
  }

  static display(msg, data) {
    if(data) {
      console.log(`Success : \n`, msg, data)
    } else {
      console.log(`Success : `, msg)
    }
  }
}
module.exports = View