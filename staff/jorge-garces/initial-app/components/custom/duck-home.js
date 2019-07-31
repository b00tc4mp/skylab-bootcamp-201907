/**
 * Duck Home Abstraction
 *
 * @param {HTMLElement} container
 */

class DuckHome extends Component {
  constructor(container) {
    super(container)

    const search = new Search(container.getElementsByClassName('search')[0])
    this.search = search

    const results = new DuckResults(
      container.getElementsByClassName('duck-results')[0]
    )
    results.hide()
    this.results = results

    const detail = new DuckDetail(
      container.getElementsByClassName('duck-detail')[0]
    )
    this.detail = detail

    const feedback = new Feedback(
      this.container.getElementsByClassName('feedback')[0]
    )
    feedback.hide()
    this.feedback = feedback

    const favs = new DuckFavorites(
      container.getElementsByClassName('duck-favorites')[0]
    )
    this.favs = favs
  }

  onClickLogout(expression) {
    const logout = this.container.querySelector('button')

    logout.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }

  showFavorites(expression) {
    const showFavorites = this.container.querySelectorAll('button')[1]

    showFavorites.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }

  show() {
    this.feedback.hide()
    this.results.hide()
    // this.show() // ERROR infinite recursion loop
    super.show()
    // Component.prototype.show.call(this)
  }
}
