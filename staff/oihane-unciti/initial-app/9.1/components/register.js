'use strict';

/**
 * Register abstraction.
 * 
 * @param {HTMLElement} container 
 */

class Register extends SubmitBack{
    constructor(container){
        super(container)
        
    }
    onSubmitRegister(expression){
        var form = this.container.children[0];
        form.addEventListener('submit', function (event) {
                event.preventDefault();

                var name = event.target.name.value;
                var surname = event.target.surname.value;
                var email = event.target.email.value;
                var password = event.target.password.value;

                expression(name, surname, email, password);
        });
    }
}
