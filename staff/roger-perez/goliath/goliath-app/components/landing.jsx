const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search', error: undefined, user: undefined, }


        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAcceptError = this.handleAcceptError.bind(this)
        this.handleDrumkit = this.handleDrumkit.bind(this)
    }

    componentWillMount() {
        const { props: { credentials } } = this

        if (credentials) {
            const { id, token } = credentials

            try {
                logic.retrieveUser(id, token)
                    .then(user => {
                        this.setState({ user: user.user })
                    })
                    .catch(({ message }) => this.setState({ error: message }))
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }
    }




    handleRegister(event) {
        event.preventDefault()

        this.props.onRegister()
    }



    handleLogin(event) {
        event.preventDefault()

        this.props.onLogin()
    }

    handleLogout(event) {
        event.preventDefault()

        const { props: { onLogout } } = this

        this.setState({ user: undefined, view: 'search' }, () => onLogout())
    }



    handleAcceptError() {
        this.setState({ error: undefined })
    }

    handleDrumkit(event) {
        event.preventDefault()

        this.props.onDrumkit()
    }


    // handleMyDrumkits(event) {
    //     event.preventDefault()

    //     onMyDrumkits()
    // }





    render() {
        const {
            state: { view, error, user, favs },
            handleRegister,
            handleLogin, handleLogout,
            handleDrumkit,
        } = this

        return (
            <>
                <header>

                    <nav>

                        {!user ? <ul>
                            <li><a href="" onClick={handleRegister}>Register</a></li>
                            <li><a href="" onClick={handleLogin}>Login</a></li>
                        </ul> : <ul>
                                {user && <p>{user.name}</p>  }
                                <li><a href="" onClick={handleDrumkit}>Drumkit</a></li>
                                <li><a href="" onClick={handleLogout}>Logout</a></li>
                            </ul>}

                    </nav>
                </header>
                <img src="../imgs/logo.png" alt="" />
                {user && <Mydrumkits drumkits={user.drumkits} onEditDrumkit={this.props.onEditDrumkit} />}
                



            </>
        )
    }
}