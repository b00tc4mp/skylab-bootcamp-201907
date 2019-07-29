/**
 * Feedback abstraction.
 * 
 * @param {HTMLElement} container 
 */

class Feedback extends Component {
    constructor(container){
        super(container)
    }
    setMessage = message => {
        this.container.innerText = message
    }
}