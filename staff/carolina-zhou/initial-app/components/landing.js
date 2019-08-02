/**
 * Landing abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Landing extends Component {
    constructor(container) {
        super(container);
    }

    onNavigateToRegister(expression) {
        const register = document.getElementsByClassName('landing__register')[0];

        register.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    }

    onNavigateToLogin(expression) {
        const login = document.getElementsByClassName('landing__login')[0];

        login.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    }
}