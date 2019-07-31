'use strict'

/**
//  * Login Panel abstraction
//  * 
//  * @param {HTMLElement} container 
//  */

class Login extends SubmitBack {
    constructor(container) {
        super(container);
    }
    onSubmitLogin(expression) {
        let form = this.container.children[0];

        form.addEventListener('submit', event => {
            event.preventDefault();

            let email = event.target.email.value;
            let password = event.target.password.value;

            expression(email, password);
        });
    }

};