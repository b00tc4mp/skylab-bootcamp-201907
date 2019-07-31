class Search extends Component{
    constructor(container){
        super(container)
        
        const feedback = new Feedback(this.container.children[2])
        feedback.hide()
        this.feedback = feedback 
    }
    onSearch = expression => {
        const form = this.container.getElementsByTagName('form')[0]
    
        form.addEventListener('submit', event => {
            event.preventDefault()
    
            const query = form.query.value
    
            expression(query)
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
 * Search abstraction.
 * 
 * @param {HTMLElement} container 
 */


// function Search(container) {
//     Component.call(this, container);
// }

// Search.prototype = Object.create(Component.prototype);
// Search.prototype.constructor = Search;

// Search.prototype.onSearch = function (expression) {
//     var form = this.container.getElementsByTagName('form')[0];

//     form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         var query = form.query.value;

//         expression(query);
//     });
// };