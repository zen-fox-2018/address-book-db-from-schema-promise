class View {
    static displaySuccess(msg) {
        console.log(msg)
    }

    static displayErr(msg, err) {
        console.log(msg)
        console.log(err)
    }

    static alert(msg) {
        console.log(msg)
    }
}

module.exports = View