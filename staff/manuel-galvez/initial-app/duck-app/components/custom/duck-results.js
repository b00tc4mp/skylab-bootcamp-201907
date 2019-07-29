/**
 *
 * Duck Results Abstraction
 * @params {HTMLElement}
 *
 */

class DuckResults extends Results {
	constructor(container) {
		super(container)
	}

	paintItem = (li, duck) => {
		const h3 = document.createElement("h3")
		h3.innerText = duck.title

		const img = document.createElement("img")
		img.src = duck.imageUrl

        
        const favButton = document.createElement('button')
        favButton.innerText = 'Favorite'

		li.appendChild(h3)
        li.appendChild(img)
        li.appendChild(favButton)

		favButton.addEventListener("click", event => {
			event.preventDefault()
            this.onToggleFavorite(duck.id)
            event.stopImmediatePropagation()
        })

		// Add event listener to each duck. It keeps duck.id in memory
		li.addEventListener("click", event => {
			event.preventDefault()
			this.onClickItem(duck.id)
        })


	}
}
