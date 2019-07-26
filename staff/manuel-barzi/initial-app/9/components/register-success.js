'use strict';

/**
 * Register Success abstraction.
 * 
 * @param {HTMLElement} container 
 */
function RegisterSuccess(container) {
    Component.call(this, container);
}

RegisterSuccess.prototype = Object.create(Component.prototype);
RegisterSuccess.prototype.constructor = RegisterSuccess;

RegisterSuccess.prototype.onNavigateToLogin = function (expression) {
    var login = this.container.children[0];

    login.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};
