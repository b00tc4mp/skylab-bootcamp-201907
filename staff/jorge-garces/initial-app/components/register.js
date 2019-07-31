/**
 * Register Abstraction
 *
 * @param {HTMLElement} container
 *
 **/

class Register extends SubmitBack {
  constructor(container) {
    super(container)
  }

  onSubmitRegister = expression => {
    const submit = this.container.querySelector('form')
    submit.addEventListener('submit', event => {
      event.preventDefault()
      const name = event.target.name.value
      const surname = event.target.surname.value
      const email = event.target.email.value
      const password = event.target.password.value

      expression(name, surname, email, password)
    })
  }
}
