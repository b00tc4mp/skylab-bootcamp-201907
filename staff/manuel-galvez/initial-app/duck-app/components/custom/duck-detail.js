/**
 *
 * Duck Detail Abstraction
 * @params {HTMLElement}
 *
 */

class DuckDetail extends Component {
	constructor(container) {
		super(container)
	}

	displayDuck = duck => {
		const title = this.container.querySelector("h3")
		title.innerText = duck.title

		const image = this.container.querySelector("img")
		image.src = duck.imageUrl

		const price = this.container.querySelector("span")
		price.innerText = duck.price

		const description = this.container.querySelector("p")
		description.innerText = duck.description

		const link = this.container.querySelectorAll("a")[1]
		link.href = duck.link

		const favoriteLink = this.container.querySelectorAll("a")[2]
		favoriteLink.dataset.value = duck.id
	}

	onNavigateBack = expression => {
		const backLink = this.container.querySelector("a")
		backLink.addEventListener("click", event => {
			event.preventDefault()
			expression()
		})
	}

	onToggleFavorite = expression => {
		const favorite = this.container.querySelectorAll("a")[2]
		favorite.addEventListener("click", event => {
			event.preventDefault()
			expression(event.target.dataset.value)
		})
	}
}
