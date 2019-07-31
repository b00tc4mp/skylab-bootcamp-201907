'use strict';

/**
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */
class SubmitBack extends Component {
    constructor(container) {
        super(container);
        let feedback = new Feedback(this.container.children[1]);
        feedback.hide();
        this.feedback = feedback;
    }

    onNavigateBack(expression) {
        let back = this.container.children[2];

        back.addEventListener('click', function (event) {
            event.preventDefault();
            expression();
        });
    };

    showFeedback(message) {
        this.feedback.setMessage(message);
        this.feedback.show();

    };

    show() {
        this.feedback.hide();
        super.show();
    };


}


