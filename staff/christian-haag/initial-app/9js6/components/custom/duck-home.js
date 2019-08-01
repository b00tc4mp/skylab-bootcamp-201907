'use strict';

/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckHome extends Component {
    constructor(container, search, results, detail) {
        super(container)

        search = new Search(container.getElementsByClassName('search')[0]);
        this.search = search;

        results = new DuckResults(container.getElementsByClassName('duck-results')[0]);
        this.results = results;

        detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0]);
        this.detail = detail;
    }

    onClickLogout(expression) {
        let logout = this.container.children[1];

        logout.addEventListener('click', function (event) {
            event.preventDefault();

            expression();
        });
    };
}

