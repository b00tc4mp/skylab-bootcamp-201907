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
		console.log(users)
	} catch (error) {
		console.log("Register error")
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
		console.log("Login error")
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
