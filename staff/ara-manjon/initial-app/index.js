// landing panel

const landing = new Landing(document.getElementsByClassName('landing')[0])

landing.onNavigateToRegister(() => {
    landing.hide()
    register.show()
})

landing.onNavigateToLogin(() => {
    landing.hide()
    login.show()
})

// register panel


const register = new Register(document.getElementsByClassName('register')[0])

register.onNavigateBack(() => {
    register.hide()
    landing.show()
})


register.onSubmitRegister((name, surname, email, password) => {

    try {
        logic.register(name, surname, email, password)

        register.hide()
        registerSuccess.show()
    } catch (error) {
        register.showFeedback(error.message)

    }
})

// register success panel

const registerSuccess = new RegisterSuccess(document.getElementsByClassName('register-success')[0])

registerSuccess.onNavigateToLogin(() => {
    registerSuccess.hide()
    login.show()
})

// login panel

const login = new Login(document.getElementsByClassName('login')[0])

login.onNavigateBack(() => {

    login.hide()
    landing.show()

})


login.onSubmitLogin((email, password) => {

    try {
        logic.login(email, password);

        login.hide()
        home.show()

    } catch (error) {
        login.showFeedback(error.message)

    }
})

// home panel

const home = new DuckHome(document.getElementsByClassName('duck-home')[0])

home.onClickLogout(() => {
    home.hide()
    home.results.hide()
    home.feedback.hide()
    landing.show()
})

home.search.onSearch(query => {
    try {
        logic.searchDucks(query, (ducks) => {
            try {
                home.results.listItems(ducks)
                home.results.show()
            } catch (error) {
                home.showFeedback(error.message)
            }
            home.feedback.hide()
        })
    } catch (error) {
        home.showFeedback(error.message)
    }
})

home.results.onClickItem = (id) => {
    logic.retrieveDuck(id, (duck) => {
        home.results.hide()
        home.detail.displayDuck(duck)
        home.detail.show()
    })
}

home.detail.onClickBack( () => {
    home.detail.hide()
    home.results.show()
})
