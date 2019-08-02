'use strict';

/**
 * Register abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Register(container) {
    SubmitBack.call(this, container);
}

Register.prototype = Object.create(SubmitBack.prototype);
Register.prototype.constructor = Register;

Register.prototype.onSubmitRegister = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
};