/**
 *
 * Duck App
 * Presentation
 *
 */

/** Landing */
const landing = new Landing(document.querySelector(".landing"))
landing.onNavigateToRegister(() => {
	landing.hide()
	register.show()
})

landing.onNavigateToLogin(() => {
	landing.hide()
	login.show()
})

/** Register */
const register = new Register(document.querySelector(".register"))

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

/** Success Register **/
const registerSuccess = new RegisterSuccess(
	document.querySelector(".register-success")
)
registerSuccess.onNavigateToLogin(() => {
	registerSuccess.hide()
	login.show()
})

/** Login **/
const login = new Login(document.querySelector(".login"))

login.onNavigateBack(() => {
	landing.show()
	login.hide()
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

/** Home **/
const home = new DuckHome(document.querySelector(".duck-home"))
home.onClickLogout(() => {
	home.hide()
	landing.show()
})

home.onClickFavorites(() => {
	logic.retrieveFavorites(favoriteResults => {
		home.favorites.listItems(favoriteResults)
		home.favorites.show()
		home.results.hide()
	})
})

home.search.onSearch(query => {
	try {
		logic.searchDucks(query, results => {
			try {
				const [ducks, request] = [...results]
				logic.validateRequest(ducks, request)
				home.results.listItems(ducks)
				home.results.show()
				login.showFeedback(error.message)
			} catch (error) {
				login.showFeedback(error.message)
			}
		})
	} catch (error) {
		login.showFeedback(error.message)
	}
})

home.results.onClickItem = id => {
	logic.retrieveDuck(id, result => {
		const [duck, request] = [...result]
		home.results.hide()
		home.detail.displayDuck(duck)
		home.detail.show()
	})
}

home.detail.onNavigateBack(() => {
	home.show()
	home.search.show()
	home.results.show()
	home.detail.hide()
})

home.detail.onToggleFavorite(id => {
	logic.favorite(id)
})

home.favorites.onClickItem = id => {
	logic.retrieveDuck(id, result => {
		const [duck, request] = [...result]
		home.results.hide()
		home.favorites.hide()
		home.detail.displayDuck(duck)
		home.detail.show()
	})
}
