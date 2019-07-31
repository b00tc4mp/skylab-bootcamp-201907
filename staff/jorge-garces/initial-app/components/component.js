/**
 * Component Abstraction
 *
 * @param {HTMLElement} container
 *
 */

class Component {
  constructor(container) {
    this.container = container
  }

  show() {
    this.container.classList.remove('hide')
    this.container.classList.add('show')
  }

  hide() {
    this.container.classList.remove('show')
    this.container.classList.add('hide')
  }
}
