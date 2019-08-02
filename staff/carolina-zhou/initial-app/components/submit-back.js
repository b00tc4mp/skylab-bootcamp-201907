/**
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */
class SubmitBack extends Component {
    constructor(container) {
        super(container);

        const feedback = new Feedback(this.container.children[1]);
        feedback.hide();
        this.feedback = feedback;
    }

    onNavigateBack(expression) {
        const back = this.container.children[2];

        back.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    }
}


SubmitBack.prototype.showFeedback = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBack.prototype.show = function () {
    this.feedback.hide();

    //this.show(); // ERROR infinite recursion loop
    Component.prototype.show.call(this);
};