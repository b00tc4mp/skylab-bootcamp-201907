'use strict';

/**
 * Feedback abstraction.
 * 
 * @param {*} container 
 */
class Feedback extends Component {

    constructor(container, msg){

        super(container)
        this.container.innerText = msg;
        this.message = msg

    }

    setMessage(msg){
        this.message = msg
    }
}

