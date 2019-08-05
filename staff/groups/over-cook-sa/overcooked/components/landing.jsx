const { component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search', query: undefined,/*ducks: [], duck: undefined,*/ error: undefined, user: undefined, favs: [] }

        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRandomRecipe = this.handleRandomRecipe.bind(this)
    }

    handleRegister(event) {
        event.preventDefault()

        this.props.onRegister()
    }

    handleLogin(event) {
        event.preventDefault()

        this.props.onLogin()
    }

    handleRandomRecipe(event) {
        event.preventDefault()

        
    }







    render(){
        return <>
            
        </>
    }
}