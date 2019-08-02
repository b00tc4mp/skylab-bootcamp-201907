'use strict';

/**
 * Search abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Search(container) {
    Component.call(this, container);
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Search.prototype.onSearch = function (expression) {
    var form = this.container.getElementsByTagName('form')[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = form.query.value;

        expression(query);
    });
};