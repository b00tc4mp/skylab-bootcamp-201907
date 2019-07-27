/**
 *
 * SubmitBack Abstraction
 * @params {HTMLElement}
 *
 */

class SubmitBack extends Component {
	constructor(container) {
		super(container)
	}

	onNavigateBack(expression) {
		const backLink = this.container.querySelector("a")
		backLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}
}
