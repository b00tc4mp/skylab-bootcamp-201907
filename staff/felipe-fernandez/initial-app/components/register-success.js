class RegisterSuccess extends Component{
    constructor(container){
        super(container)
    }

    onNavigateToLogin = expression => {
        var login = this.container.children[0]
    
        login.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }
    
}

/**
 * Register Success abstraction.
 * 
 * @param {HTMLElement} container 
 */

