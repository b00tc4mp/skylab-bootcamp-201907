'use strict';

/**
 * Landing abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Landing extends Component {
    constructor(container){
        super(container)
    }

    onNavigateToRegister(expression){ 
        var register = this.container.children[0];
        register.addEventListener('click', function (event) {
            event.preventDefault();

            expression();
        });
    }

    onNavigateToLogin(expression){ 
        var login = this.container.children[1];
        login.addEventListener('click', function (event) {
            event.preventDefault();

            expression();
        });
    }
}

