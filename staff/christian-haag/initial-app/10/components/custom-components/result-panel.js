/**
 * 
 *  Result Panel abstraction.
 * 
 * @param {*} container 
 */

class ResultPanel extends Component {
    constructor(container) {
        super(container);

        let result = new DuckResult(container.children[0])
        this.result = result

        let detail = new DuckDetail(container.children[1])
        this.detail = detail

    }

}