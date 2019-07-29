/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckHome extends Results {
    constructor(container) {
        super(container)
    let search = new Search(container.getElementsByClassName('search')[0])
    this.search = search

    let results = new DuckResults(container.getElementsByClassName('duck-results')[0])
    this.results = results

    let detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0])
    this.detail = detail
    


    }
    onClickLogout = (expression) => {
        let logout = this.container.getElementsByTagName('button')[0]

        logout.addEventListener('click', (event) => {
            event.preventDefault()

            expression()
        })
    }
    
}