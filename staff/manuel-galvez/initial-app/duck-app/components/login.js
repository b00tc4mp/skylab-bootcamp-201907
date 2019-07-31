/**
 *
 * Login abstraction
 * @params {HTMLElement}
 *
 */

class Login extends SubmitBack {
	constructor(container) {
		super(container)
	}

	onSubmitLogin(expression) {
		const loginForm = this.container.querySelector("form")

		loginForm.addEventListener("submit", event => {
			event.preventDefault()

			const email = event.target.email.value
			const password = event.target.password.value

			expression(email, password)
		})
	}
}
