/**
 * Login abstraction.
 * 
 * @param {HTMLElement} container 
 */

class Login extends SubmitBack{
    constructor(container){
        super(container)
    }
    onSubmitLogin(expression) {
        const form = this.container.children[0]
    
        form.addEventListener('submit', event=> {
            event.preventDefault()
    
            const email = event.target.email.value
            const password = event.target.password.value
    
            expression(email, password)
        })
    }
}







/* function Login(container) {
    SubmitBack.call(this, container);
}

Login.prototype = Object.create(SubmitBack.prototype);
Login.prototype.constructor = Login;

Login.prototype.onSubmitLogin = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
    });
}; */