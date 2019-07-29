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
	logic.retrieveFavorites((error, ducks) => {
		if (error) {
			alert(error.message)
		} else{
			home.favorites.listItems(ducks)
			home.favorites.show()
			home.results.hide()
		}
	})
})

home.search.onSearch(query => {
	logic.searchDucks(query, (error, ducks) => {
		if (!error) {
			home.results.listItems(ducks)
			home.results.show()
		} else {
			home.search.showFeedback(error.message)
		}
	})
})

home.results.onClickItem = id => {
	logic.retrieveDuck(id, (error, duck) => {
		if (!error) {
			home.results.hide()
			home.detail.displayDuck(duck)
			home.detail.show()
			referer = home.results
		} else {
			alert(error.message)
		}
	})
}

home.detail.onNavigateBack(() => {
	if (referer instanceof DuckFavorites) {
		 home.favorites.show()
		 home.results.hide()
	} else {
		 home.favorites.hide()
		 home.results.show()
	}
	home.detail.hide()
})

home.results.onToggleFavorite = id => {
	logic.favorite(id)
}

home.detail.onToggleFavorite(id => {
	logic.favorite(id)
})

home.favorites.onClickItem = id => {
	logic.retrieveDuck(id, (error, duck) => {
		if (!error) {
			home.results.hide()
			home.favorites.hide()
			home.detail.displayDuck(duck)
			home.detail.show()
			referer = home.favorites
		} else {
			alert(error.message)
		}
	})
}
