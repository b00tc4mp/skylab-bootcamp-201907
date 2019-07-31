class Landing extends Component{
    constructor(container){
        super(container)
}

onNavigateToRegister = expression => {
    const register = this.container.children[0]

    register.addEventListener('click', event => {
        event.preventDefault()

        expression()
    })
}

onNavigateToLogin = expression => {
    const login = this.container.children[1];

    login.addEventListener('click', event => {
        event.preventDefault()

        expression()
    })
}
}
