/**
 * Register Success Abstraction
 *
 * @param {HTMLElement} container
 *
 */

class RegisterSuccess extends Component {
  constructor(container) {
    super(container)
  }

  onNavigateToLogin = expression => {
    const login = this.container.querySelector('a')
    login.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }
}
