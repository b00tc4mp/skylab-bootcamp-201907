// 'use strict';

// /**
//  * Search abstraction.
//  * 
//  * @param {HTMLElement} container 
//  */

class Search extends Component{  
    constructor(container){
        super(container)
        const feedback = new Feedback(this.container.querySelector('.feedback'));
        this.feedback = feedback
    }

    onSearch(expression){
        const form = this.container.getElementsByTagName('form')[0]

        form.addEventListener('submit' , function(event){
            event.preventDefault()
            const query = !(form.query.value) || !(form.query.value.trim()) ? undefined : form.query.value
            expression(query)
        })
    }

    showFeedback(message){
        this.feedback.setMessage(message)
        this.feedback.show()
    }
}