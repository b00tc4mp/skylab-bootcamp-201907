/**
 *
 * Duck Home Abstraction
 * @params {HTMLElement}
 *
 */

class DuckHome extends Component {
	constructor(container) {
		super(container)
	}

	onLogout = expression => {
		const logoutLink = this.container.querySelectorAll("button")[0]
		logoutLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}
}
