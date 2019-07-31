/**
 * Search abstraction
 */

class Search extends Component {
  constructor(container) {
    super(container)
  }

  onSearch(expression) {
    const form = this.container.querySelector('form')

    form.addEventListener('submit', event => {
      event.preventDefault()

      const query = form.query.value
      expression(query)
    })
  }
}
