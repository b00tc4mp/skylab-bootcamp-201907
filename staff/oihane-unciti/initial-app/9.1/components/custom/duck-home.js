'use strict';

/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */


class DuckHome extends Component{
    constructor(container){
         super(container)
            var search = new Search(container.getElementsByClassName('search')[0]);
            this.search = search;

            var results = new DuckResults(container.getElementsByClassName('duck-results')[0]);
            this.results = results;

            var detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0]);
            this.detail = detail;
    }
    
    onClickLogout(expression){
        var logout = this.container.children[1];

        logout.addEventListener('click', function (event) {
                event.preventDefault();

                expression();
        });
    }
    onClickShowFavourites(expression){
        var button = this.container.getElementsByTagName("button")[1];
        button.addEventListener('click', function (event) {
            event.preventDefault();
            expression();
        });
    }
}

