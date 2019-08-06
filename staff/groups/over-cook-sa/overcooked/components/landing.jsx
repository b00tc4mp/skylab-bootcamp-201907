const { component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'X', user: undefined }

        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRandomRecipe = this.handleRandomRecipe.bind(this)
        this.handleRegisterSucces = this.handleRegisterSucces.bind(this)
    }

    // handleRegister(event) {
    //     event.preventDefault()

    //     this.props.onRegister()
    // }

    // handleLogin(event) {
    //     event.preventDefault()

    //     this.props.onLogin()
    // }

    // handleRandomRecipe(event) {
    //     event.preventDefault()

        
    // }

    // handleRegisterSucces(event) {
    //     event.preventDefault()

    // }

    render(){
        return <>
            <header>
                <img src="" alt=""/>
                <h1>OVERCOOKED</h1>

            </header>
            <main>
                <nav>
                    <ul>
                        <li>
                            <a href="" onClick="">Register</a>
                        </li>
                        <li>
                            <a href="" onClick="">Login</a>
                        </li>
                    </ul>
                </nav>
                <section>
                    <RandomRecipe />
                </section>
            </main> 
        </>
    }
}