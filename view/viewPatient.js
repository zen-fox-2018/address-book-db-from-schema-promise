class ViewPatient {
  static accessDenied(err) {
    console.log(`ERROR: ${err}`)
  }

  static addPatientSucceed(total) {
    console.log(`Data pasien berhasil ditambahkan. Total data pasien: ${total}`)
  }
}

module.exports = ViewPatient
