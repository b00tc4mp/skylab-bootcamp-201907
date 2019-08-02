'use strict'

/**
 * 
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */


class SubmitBack extends Component {
    constructor(container) {
        super(container);
        let feedback = new Feedback(this.container.getElementsByClassName('alert')[0]);
        feedback.hide();
        this.feedback = feedback;
    }

    onNavigateBack(expression) {
        let backLink = this.container.children[2];

        backLink.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });
    }

    showFeedBack(message) {
        this.feedback.setMessage(message);
        this.feedback.show();
    }

    show() {
        this.feedback.hide();
        super.show();
    }
};
