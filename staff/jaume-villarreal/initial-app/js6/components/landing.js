/**
 * Landing abstraction.
 * 
 * @param {HTMLElement} container 
 */

class Landing extends Component{
    constructor(container){
        super(container)
    }

    onNavigateToRegister(expression){
        const register = this.container.getElementsByTagName('a')[0];

        register.addEventListener('click' , function(event){
            event.preventDefault()
            expression()
        })
    }

    onNavigateToLogin(expression){
        const login = this.container.getElementsByTagName('a')[1];

        login.addEventListener('click' , function(event){
            event.preventDefault()
            expression()
        })
    }
}