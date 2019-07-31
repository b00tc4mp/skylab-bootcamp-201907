/**
 *
 * Landing abstraction
 * @params {HTMLElement}
 *
 */

class Landing extends Component {
	constructor(container) {
		super(container)
	}

	onNavigateToRegister = expression => {
		const registerLink = this.container.querySelectorAll("a")[0]

		registerLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}

	onNavigateToLogin = expression => {
		const loginLink = this.container.querySelectorAll("a")[1]

		loginLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}
}
