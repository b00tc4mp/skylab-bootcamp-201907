/**
 * Presentation
 */

// initial panel

const landing = new Landing(document.getElementsByClassName('landing')[0]);

landing.onNavigateToRegister( () => { 
    landing.hide() 
    register.show()
})


landing.onNavigateToLogin( () => {
    landing.hide()
    login.show()
})

// register panel

const register = new Register(document.getElementsByClassName('register')[0])

register.onNavigateBack( () => {
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

let loggedUser

login.onSubmitLogin((email, password) => {
    try {
        loggedUser = logic.login(email, password)

        login.hide()
        home.show()
        
    } catch (error) {
        login.showFeedback(error.message)
    }
})

// welcome panel

const home = new DuckHome(document.getElementsByClassName('duck-home')[0])

home.onClickLogout( () => {
    home.hide()
    landing.show()
})



// delete Ducks.prototype.paintItem; // WHAT if...
// home.results.paintItem = function(li, duck) { // WHAT if...
//     console.log(duck);
// };

home.search.onSearch((query) => {
    home.search.feedback.hide()
    try {
   
    logic.searchDucks(query, (ducks) => {
        try {
        home.results.listItems(ducks)
        home.results.show()
        
         }catch (error){
           home.showFeedback(error)
         }
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


//button back detail panel
const detail = new DuckDetail(document.getElementsByClassName('duck-detail')[0])

detail.onNavigateBack( () => {
    detail.hide()
    home.results.show()
})

detail.addFav( id => {
    logic.favorites(id)
})


// favorites


//button to go to favorites
home.onClickFavorites( () => {
    
    home.search.hide()
    home.results.hide()
    home.favorites.show()
    home.detail.hide()

})

//button back favorites
const duckfavorites = new DuckFavorites(document.getElementsByClassName('duck-favorites')[0])

duckfavorites.onNavigateBack( () => {
    home.favorites.hide()
    home.search.show()
})