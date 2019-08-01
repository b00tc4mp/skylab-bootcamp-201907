/**
 * Landing Abstraction
 *
 * @param {HTMLEelement} container
 */

class Landing extends Component {
  constructor(container) {
    super(container)
  }

  onNavigateToRegister(expression) {
    const register = this.container.querySelectorAll('a')[0]
    register.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }

  onNavigateToLogin(expression) {
    const login = this.container.querySelectorAll('a')[1]

    login.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }
}
