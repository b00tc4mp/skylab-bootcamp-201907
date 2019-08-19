'use strict'

/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckHome extends Component {
    constructor(container) {
        super(container)

        const search = new Search(container.getElementsByClassName('search')[0])
        this.search = search

        const results = new DuckResults(container.getElementsByClassName('duck-results')[0])
        this.results = results

        const detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0])
        this.detail = detail
    }

    onClickLogout(expression) {
        const logout = this.container.children[1]

        logout.addEventListener('click', event => {
            event.preventDefault()

            expression()
        })
    }
}
