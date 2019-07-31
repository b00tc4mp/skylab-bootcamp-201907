/**
 *
 * SubmitBack Abstraction
 * @params {HTMLElement}
 *
 */

class SubmitBack extends FeedbackAttached {
	constructor(container) {
		super(container)
	}

	onNavigateBack = expression => {
		const backLink = this.container.querySelector("a")
		backLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}
}
