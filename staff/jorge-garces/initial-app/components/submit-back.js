/**
 * Submit-Back Abstraction
 *
 * @param {HTMLElement} container
 **/

class SubmitBack extends Component {
  constructor(container) {
    super(container)

    const feedback = new Feedback(this.container.children[1])
    feedback.hide()
    this.feedback = feedback
  }

  onNavigateBack = expression => {
    const back = this.container.querySelector('a')
    back.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }

  showFeedback = message => {
    this.feedback.setMessage(message)
    this.feedback.show()
  }

  show() {
    this.feedback.hide()
    // this.show() // ERROR infinite recursion loop
    super.show()
    // Component.prototype.show.call(this)
  }
}
