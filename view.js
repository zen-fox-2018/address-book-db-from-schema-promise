class View {
  static successCreateUser(newUser, datalength){
    var user = {
      username : newUser.username,
      password : newUser.password,
      role : newUser.role
    };
    console.log(user);
    console.log(`save data success ${user}. Total employee : ${datalength}`);
  }

  static errCreateUser(err){
    console.log('error create data!');
    console.log(err);
  }

  static userSuccessLogin(user){
    console.log(`user ${user} logged in successfully`);
  }

  static errLogin(err){
    console.log('login error!');
    console.log(err);
  }

  static somebodyIsLogin(user){
    console.log(`${user} is login!`);
  }

  static notDoctor(){
    console.log('tidak memiliki akses untuk add patient');
  }

  static errAddPatient(err){
    console.log('Add patient error!');
    console.log(err);
  }

  static addPatientSuccess(data){
    console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data}`);
  }
}

module.exports = View;
