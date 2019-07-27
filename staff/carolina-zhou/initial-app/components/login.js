/**
 * Login abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Login extends SubmitBack {
    constructor(container) {
        super(container);
    }

    onSubmitLogin(expression) {
        const form = this.container.children[0];

        form.addEventListener('submit', event => {
            event.preventDefault();

            const email = event.target.userEmail.value;
            const password = event.target.userPassword.value;

            expression(email, password);
        });
    }
}