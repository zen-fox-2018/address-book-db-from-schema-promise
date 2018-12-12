const View = require('../view/viewEmployee.js')
const Model = require('../model/modelEmployee.js')

class Controller {
  static search() {
    Model.findAll()
    .then((data) => {
      View.findSucceed(data)
    })
    .catch((err) => {
      View.findError(err)
    })
  }


  static register(name, username, password, role) {
    let newData = {name: name, username: username, role: role};
    Model.register(name, username, password, role)
    .then((registeredData) => {
      return Model.countAllData()
    })
    .then((countData) => {
      View.registerSuccess(newData, countData.countData)
    })
    .catch((err) => {
      View.registerError(err)
    })
  }

  static login(username, password) {
    Model.findOne('isLogin', 1)
    .then((loggedIn) => {
      // console.log(loggedIn);
      if (!loggedIn) {
        // console.log('masok')
        return Model.findOne('username', username)
      } else {
        throw `Someone is login in the system.`
      }
    })
    .then((usernameChecking) => {
      if (usernameChecking === undefined) {
        throw 'Username / Password Wrong.'
      } else {
        if (usernameChecking.password === password) {
          return Model.updateFile(usernameChecking.id, 1, 'isLogin')
        }
      }
    })
    .then((checkingUsernameSucceed) => {
        View.loginSuccessfull(username)
    })
    .catch((err) => {
      View.errorLogin(err)
    })
  }
}

module.exports = Controller
