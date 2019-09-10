/**
 * Presentation
 */

// initial panel

const landing = new Landing(document.getElementsByClassName('landing')[0])

landing.onNavigateToRegister( () => {
    landing.hide()
    register.show()
})

landing.onNavigateToLogin( () =>{
    landing.hide()
    login.show()
})

// register panel

const register = new Register(document.getElementsByClassName('register')[0])

register.onNavigateBack( () => {
    register.hide()
    register.clearInputs()
    landing.show()
})

register.onSubmitRegister( (name, surname, email, password, favourites) => {
    
    try {
        logic.register(name, surname, email, password, favourites)

        register.hide()
        register.clearInputs()
        registerSuccess.show()
    } catch (error) {
        register.showFeedback(error.message)
    }
})

// register success panel

const registerSuccess = new RegisterSuccess(document.getElementsByClassName('register-success')[0])

registerSuccess.onNavigateToLogin( () => {
    registerSuccess.hide()
    register.clearInputs()
    login.clearInputs()
    login.show()
})

// login panel

const login = new Login(document.getElementsByClassName('login')[0])

login.onNavigateBack( () => {
    login.hide()
    login.clearInputs()
    landing.show()
})

login.onSubmitLogin( (email, password) => {
    try {
        logic.login(email, password)

        login.hide()
        login.clearInputs()
        home.show()
    } catch (error) {
        login.showFeedback(error.message)
    }
})

// welcome panel

const home = new DuckHome(document.getElementsByClassName('duck-home')[0])

home.onClickLogout( () => {
    home.hide()
    home.results.hide()
    landing.show()
})

home.search.onSearch(query => {
    try {
        logic.searchDucks(query, (ducks) => {
            try {
                home.results.listItems(ducks)
                home.results.clearInputs()
                home.results.show()
            } catch (error) {
                home.showFeedback(error.message)
            }
            home.showFeedback.hide()
        })
    } catch (error) {
        home.showFeedback(error.message)
    }
})

home.results.onClickItem = id => {
    logic.retrieveDuck(id, (duck) => {
        home.results.hide()
        home.detail.displayDuck(duck)
        home.clearInputs()
        home.detail.show()
    })
}

const detailback = new DuckDetail(document.getElementsByClassName('duck-detail')[0])

detailback.onNavigateBack( () => {
    detailback.hide()
    home.results.show()
})

