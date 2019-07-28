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

/** Login **/
const login = new Login(document.querySelector(".login"))

login.onNavigateBack(() => {
	landing.show()
	login.hide()
})

login.onSubmitLogin((email, password) => {
	try {
		logic.login(email, password)
		login.hide()
		home.show()
	} catch (error) {
		login.showFeedback(error.message)
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

/** Home **/
const home = new DuckHome(document.querySelector(".duck-home"))
home.onLogout(() => {
	home.hide()
	landing.show()
})

const search = new Search(document.querySelector(".search"))
search.onSearch(query => {
	logic.searchDucks(query, ducks => {
		
	})
})

