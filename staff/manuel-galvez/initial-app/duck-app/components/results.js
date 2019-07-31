/**
 *
 * Results Abstraction
 * @params {HTMLElement}
 *
 */

class Results extends Component {
	constructor(container) {
		super(container)
	}

	listItems = items => {
		const ul = this.container.querySelector("ul")
		ul.innerHTML = ""

		items.forEach(item => {
			const li = document.createElement("li")
			ul.appendChild(li)
			this.paintItem(li, item)
		})
	}
	// Only to be used if children does not have paintItem method
	paintItem = (li, item) => {
		li.innerText = item
	}
}
