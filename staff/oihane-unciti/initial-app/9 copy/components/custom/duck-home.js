'use strict';

/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckHome(container) {
    Component.call(this, container);

    var search = new Search(container.getElementsByClassName('search')[0]);
    this.search = search;

    var results = new DuckResults(container.getElementsByClassName('duck-results')[0]);
    this.results = results;

    var detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0]);
    this.detail = detail;
}

DuckHome.prototype = Object.create(Component.prototype);
DuckHome.prototype.constructor = DuckHome;

DuckHome.prototype.onClickLogout = function (expression) {
    var logout = this.container.children[1];

    logout.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};