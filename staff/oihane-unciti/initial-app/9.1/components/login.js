'use strict';

/**
 * Login abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Login extends Component {
    constructor (container){
        super(container)
        
    }

    onSubmitLogin(expression){
        var form = this.container.children[0];
        form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
        });
    }
    
    onNavigateBack(expression){
        var back = this.container.children[2];
        back.addEventListener('click', function (event) {
            event.preventDefault();

            expression();
        });
    }      
}
