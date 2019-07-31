'use strict'

/**
 * Feedback abstraction.
 * @param {*} container 
 */

class Feedback extends Component {
    constructor(container) {
        super(container);
    }

    setMessage = message => {
        this.container.innerText = message;
    };
}
