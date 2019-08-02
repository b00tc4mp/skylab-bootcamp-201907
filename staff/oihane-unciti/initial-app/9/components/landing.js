'use strict';

/**
 * Landing abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Landing(container) {
    Component.call(this, container);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Landing.prototype.onNavigateToRegister = function (expression) {
    var register = this.container.children[0];

    register.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

Landing.prototype.onNavigateToLogin = function (expression) {
    var login = this.container.children[1];

    login.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};