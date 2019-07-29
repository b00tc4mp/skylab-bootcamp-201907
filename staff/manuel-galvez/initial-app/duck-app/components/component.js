/**
 *
 * Component Abstraction
 * @params {HTMLElement}
 *
 */

class Component {
	constructor(container) {
		this.container = container
	}
	show() {
		this.container.classList.add("show")
		this.container.classList.remove("hide")
		// Clear inputs if exist
		this.container.querySelectorAll("input").forEach(input => {
			input.value = ""
		})
	}
	hide() {
		this.container.classList.add("hide")
		this.container.classList.remove("show")
	}
}
