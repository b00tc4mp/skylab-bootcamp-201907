/**
 * Landing abstraction
 * 
 * @param {HTMLElement} container 
 */

class Landing extends Component {
    constructor(container) {
        super(container);
    };

    onNavigateToRegister(expression) {
        var registerLink = this.container.children[0].children[0];

        registerLink.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });

    };

    onNavigateToLogin(expression) {
        var loginLink = this.container.children[0].children[1];

        loginLink.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });

    };
}