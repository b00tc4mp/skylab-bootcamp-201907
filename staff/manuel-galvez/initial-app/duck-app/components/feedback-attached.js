/**
 *
 * FeedbackAttached Abstraction
 * @params {HTMLElement}
 *
 */

class FeedbackAttached extends Component {
	constructor(container) {
		super(container)
		const feedback = new Feedback(this.container.querySelector('.feedback'))
		feedback.hide()
		this.feedback = feedback
	}

	showFeedback = message => {
		this.feedback.setMessage(message)
		this.feedback.show()
	}

	// Shadows Component's show() to hide feedback when invoked and prevent infinite loop
	show = () => {
		this.feedback.hide()
		super.show()
	}	
}
