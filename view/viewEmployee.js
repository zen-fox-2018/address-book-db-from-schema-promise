class View {
  static findError(err) {
      console.log(`ERROR!! ===== ${err}`)
  }

  static findSucceed(data) {
      console.log(`Here's all the data: `);
      console.log(data)
  }

  static registerError(err) {
      console.log(`REGISTER ERROR: ${err}`)
  }

  static registerSuccess(data, length) {
      console.log(`Save Data Success ${JSON.stringify(data)} has been added. Total employee: ${length}`)//${data[data.length - 1]}
  }

  static loginError(err) {
    console.log('Anda tidak bisa melakukan login karena sedang ada user yang login.');
      // console.log(`ERROR! ==== ${err}`)
  }

  static usernameAndPasswordDontMatch() {
      console.log(`Username / Password Wrong.`)
  }

  static loginSuccessfull(username) {
      console.log(`Welcome! User ${username} logged in successfully.`)
  }

  static errorLogin(err) {
      // console.log(`Someone is login in the system.`)
      console.log(`ERROR [LOGIN ERROR] ${err}`);
  }
}

module.exports = View
