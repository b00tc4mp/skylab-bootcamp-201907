/**
 * 
 * Feedback Abstraction
 * @params {HTMLElement}
 * 
 */

class Feedback extends Component {
    constructor(container) {
        super(container)
    }
    setMessage = (message) => {
        this.container.innerText = message
    }
}