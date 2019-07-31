/**
 *
 *Register Success Abstraction
 * @params {HTMLElement}
 *
 */

class RegisterSuccess extends Component {
	constructor(container) {
		super(container)
	}

	onNavigateToLogin = expression => {
		const loginLink = this.container.querySelector("a")
		loginLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}
}
