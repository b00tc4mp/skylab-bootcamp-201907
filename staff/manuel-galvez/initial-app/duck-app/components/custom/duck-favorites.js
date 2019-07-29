/**
 *
 * Duck Favorite abstraction
 * @params {HTMLElement}
 *
 */

class DuckFavorites extends Results {
	constructor(container) {
		super(container)
	}

	paintItem = (li, duck) => {
		const h3 = document.createElement("h3")
		h3.innerText = duck.title

		const img = document.createElement("img")
		img.src = duck.imageUrl

		li.appendChild(h3)
		li.appendChild(img)

		// Add event listener to each duck. It keeps duck.id in memory
		li.addEventListener("click", event => {
			event.preventDefault()
			this.onClickItem(duck.id)
		})
	}
}
