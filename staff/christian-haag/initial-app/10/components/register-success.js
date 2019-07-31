'use strict'

/**
 * 
 *
 * Register success Panel abstraction
 *
 * @param {HTMLElement} container
 */
class RegisterSuccess extends Component {
    constructor(container) {
        super(container);
    }
    onNavigateToLogin(expression) {
        let login = this.container.children[0];
        login.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    };
};