'use strict'

/**
 * Search abstraction.
 * 
 * @param {*} container 
 */

class Search extends Component {
    constructor(container) {
        super(container);

    }

    onSearch(expression) {
        let form = this.container.children[0];

        form.addEventListener('submit', event => {
            event.preventDefault();

            let query = form.query.value;

            expression(query);

        });
    }

};