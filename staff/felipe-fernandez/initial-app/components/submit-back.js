class SubmitBack extends Component {
    constructor(container){
        super(container)

        const feedback = new Feedback(this.container.children[1])
        feedback.hide()
        this.feedback = feedback
}

onNavigateBack = expression => {
    const back = this.container.children[2]

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
    super.show()
    
    //this.show(); // ERROR infinite recursion loop
    //  Component.prototype.show.call(this)
   
}

}

/**
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */
