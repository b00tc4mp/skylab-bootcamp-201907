/**
 *
 * Duck Home Abstraction
 * @params {HTMLElement}
 *
 */

class DuckHome extends Component {
	constructor(container) {
		super(container)

		const search = new Search(this.container.querySelector(".search"))
		this.search = search

		const results = new DuckResults(
			this.container.querySelector(".duck-results")
		)
		this.results = results

		const detail = new DuckDetail(this.container.querySelector(".duck-detail"))
		this.detail = detail

		const favorites = new DuckFavorites(
			this.container.querySelector(".duck-favorites")
		)
		this.favorites = favorites
	}

	onClickLogout = expression => {
		const logoutLink = this.container.querySelectorAll("button")[0]
		logoutLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}

	onClickFavorites = expression => {
		const favoriteButton = this.container.querySelectorAll("button")[1]
		favoriteButton.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}
}
