
/**
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */

 class SubmitBack extends Component{
     constructor(container){
        super(container)
        let feedback = new Feedback(this.container.children[1])
        feedback.hide()
        this.feedback = feedback 
     }
     onNavigateBack(expression) {
        const back = this.container.children[2]
    
        back.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }
    showFeedback(message) {
        this.feedback.setMessage(message);
        this.feedback.show();
    };
    show(){
        this.feedback.hide()
        // Component.prototype.show.call(this);
        super.show()
    }

 }






/* 
function SubmitBack(container) {
    Component.call(this, container);

    var feedback = new Feedback(this.container.children[1]);
    feedback.hide();
    this.feedback = feedback;
}

SubmitBack.prototype = Object.create(Component.prototype);
SubmitBack.prototype.constructor = SubmitBack;

SubmitBack.prototype.onNavigateBack = function (expression) {
    var back = this.container.children[2];

    back.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

SubmitBack.prototype.showFeedback = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBack.prototype.show = function () {
    this.feedback.hide();

    //this.show(); // ERROR infinite recursion loop
    Component.prototype.show.call(this);
}; */