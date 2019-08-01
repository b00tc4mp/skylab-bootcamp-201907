'use strict'

/**
 * Login abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Login extends SubmitBack {
    constructor (container){
        super(container)
    }
    onSubmitLogin = expression => {
        const form = this.container.children[0];
        form.addEventListener('submit', event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value
            expression(email, password)
        })
    }
}



    

        

        
   
