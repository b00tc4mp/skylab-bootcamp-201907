'use strict';

/**
 * Register abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Register extends SubmitBack {
    constructor(container) {
        super(container);
    }
    onSubmitRegister(expression) {
        let form = this.container.children[0];

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            let name = event.target.name.value;
            let surname = event.target.surname.value;
            let email = event.target.email.value;
            let password = event.target.password.value;

            expression(name, surname, email, password);
        });
    }

};