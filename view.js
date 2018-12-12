class View {

  static displayRegStatus(username, password, role, totalCount) {
    console.log('--- Registration Completed ---')
    console.log(`{username: ${username}, password: ${password}, role: ${role}}`)
    console.log(`Total Employees: ${totalCount}`)
  }

  static displayError(err) {
    console.log(`ERR: ${err}`)
  }

  static succeedLogin(username) {
    console.log(`user ${username} has successfully logged in`)
  }
  
  static succeedRegNewPatient(name, count) {
    console.log(`Patient ${name} has been successfully added`)
    console.log(`Total Patients: ${count}`)
  }

}

module.exports = View;