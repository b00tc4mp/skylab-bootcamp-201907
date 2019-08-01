/**
 * Feedback abstraction.
 * 
 * @param {*} container 
 */
class Feedback extends Component {
    constructor (container) {
        super (container)
    }

    setMessage = message => this.container.innerText = message
}




// 'use strict';

// function Feedback(container) {
//     Component.call(this, container);
// }

// Feedback.prototype = Object.create(Component.prototype);
// Feedback.prototype.constructor = Feedback;

// Feedback.prototype.setMessage = function (message) {
//     this.container.innerText = message;
// };