// Presetation

// panels declarations

const home = new Home(document.getElementsByClassName('home')[0])
const signIn = new SignIn(document.getElementsByClassName('signIn')[0])
const enroll = new Enroll(document.getElementsByClassName('enroll')[0])
const enrollSuccess = new EnrollSuccess(document.getElementsByClassName('enrollSuccess')[0])
const landing = new Landing(document.getElementsByClassName('landing')[0])

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

enroll.onEnroll(function (name,lastName,email,pass) {
    try {
        register(name, lastName, email, pass)
        enroll.hide()
        enrollSuccess.show()
    }
    catch{ console.log(error)}
    
})
enroll.onBack(function () {
        enroll.hide()
        home.show()
})


// enroll success behaviour

enrollSuccess.onSignIn(function () {
    enrollSuccess.hide()
    signIn.show()
})

// login behaviour

signIn.onSignIn(function (email,password) {
    try {
        login(email, password)
        signIn.hide()
        landing.show()
    } catch (error) {
        console.log(error)
    }
})

signIn.onBack(function () {
    signIn.hide()
    home.show()
})

landing.onLogOut(function () {
    landing.hide()
    home.show()
})

