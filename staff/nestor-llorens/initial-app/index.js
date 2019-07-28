// Presetation

// panels declarations

const home = new Home(document.getElementsByClassName('home')[0])
const signIn = new SignIn(document.getElementsByClassName('signIn')[0])
const enroll = new Enroll(document.getElementsByClassName('enroll')[0])
const enrollSuccess = new Enroll(document.getElementsByClassName('enrollSuccess')[0])

// home behaviour

home.onEnroll(function () {
    home.hide()
    enroll.show()
})

home.onSignIn(function () {
    home.hide()
    signIn.show()
})

// enroll behaviour

enroll.onEnroll(function () {
    enroll.hide()
    enrollSuccess.show()
})





