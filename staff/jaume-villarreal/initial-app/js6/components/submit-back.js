// /**
//  * Submit Back abstraction.
//  * 
//  * @param {HTMLElement} container 
//  */
class SubmitBack extends Component{
    constructor(container){
        super(container)
        const feedback = new Feedback(this.container.children[1])
        this.feedback = feedback;
        feedback.hide();
    }

    onNavigateBack(expression){
        const back = this.container.children[2];

        back.addEventListener('click' , function(event){
            event.preventDefault()
            expression();
        })
    }

    showFeedback(message){
        this.feedback.setMessage(message)
        this.feedback.show()
    }

    show(){
        this.feedback.hide()
        // Component.prototype.show.call(this);
        super.show()
    }

    resetForm(){
        const inputs = [...this.container.querySelector('form').getElementsByTagName('input')];
        inputs.forEach(input => input.value = '')
    }
}