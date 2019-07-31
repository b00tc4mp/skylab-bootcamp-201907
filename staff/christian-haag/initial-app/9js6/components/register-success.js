'use strict';

/**
 * Register Success abstraction.
 * 
 * @param {HTMLElement} container 
 */
class RegisterSuccess extends Component {
    constructor(container) {
        super(container);
    }
    onNavigateToLogin(expression) {
        let login = this.container.children[0];
        login.addEventListener('click', function (event) {
            event.preventDefault();

            expression();
        });
    };
};
