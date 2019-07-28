
/**
 * Register abstraction.
 * 
 * @param {HTMLElement} container 
 */

 class Register extends SubmitBack{
     constructor(container){
         super(container)
     }
     onSubmitRegister (expression) {
        const form = this.container.children[0]
    
        form.addEventListener('submit', event => {
            event.preventDefault();
    
            const name = event.target.name.value
            const surname = event.target.surname.value
            const email = event.target.email.value
            const password = event.target.password.value
    
            expression(name, surname, email, password)
        })
    }



 }










/* 

function Register(container) {
    SubmitBack.call(this, container);
}

Register.prototype = Object.create(SubmitBack.prototype);
Register.prototype.constructor = Register;

Register.prototype.onSubmitRegister = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
}; */