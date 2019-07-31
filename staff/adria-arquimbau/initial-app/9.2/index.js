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
    landing.show()
})

register.onSubmitRegister( (name, surname, email, password) => {
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

registerSuccess.onNavigateToLogin( () => {
    registerSuccess.hide()
    login.show()
})

// login panel

const login = new Login(document.getElementsByClassName('login')[0])

login.onNavigateBack( () => {
    login.hide()
    landing.show()
})

login.onSubmitLogin( (email, password) => {
    try {
        logic.login(email, password)

        login.hide()
        home.show()
    } catch (error) {
        login.showFeedback(error.message)
    }
})

// home panel
const home = new DuckHome(document.getElementsByClassName('duck-home')[0])
const favorite = new DuckFavorite(document.getElementsByClassName('duck-favorite')[0])


home.onClickLogout( () => {
    home.hide()
    landing.show()
})

home.search.onSearch( query => {
    logic.searchDucks(query, (ducks) => {
        home.results.listItems(ducks)
        home.results.show()
    })
})

home.onClickFavorite( () => {
    home.hide()
    favorite.show()
})

home.results.onClickItem = id => {
    logic.retrieveDuck(id, (duck) => {
        home.results.hide()
        home.detail.displayDuck(duck)
        home.detail.show()
    })
}

const detailback = new DuckDetail(document.getElementsByClassName('duck-detail')[0])

detailback.onNavigateBack( () => {
    detailback.hide()
    home.results.show()
})

favorites.onNavigateBack( () => {
    favorites.hide()
    home.search.show()
})


