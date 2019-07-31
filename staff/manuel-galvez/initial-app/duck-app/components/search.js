/**
 *
 * Search Abstraction
 * @params {HTMLElement}
 *
 */

class Search extends FeedbackAttached {
	constructor(container) {
		super(container)
	}

	onSearch = expression => {
		const searchForm = this.container.querySelector("form")

		searchForm.addEventListener("submit", event => {
			event.preventDefault()
			const query = searchForm.query.value
			expression(query)
		})
	}
}
