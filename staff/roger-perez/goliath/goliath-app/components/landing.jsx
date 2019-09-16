const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { view: 'search',  error: undefined, user: undefined, }


        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAcceptError = this.handleAcceptError.bind(this)
        this.handleDrumkit = this.handleDrumkit.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
         }

    componentWillMount() {
        const { props: { credentials } } = this

        if (credentials) {
            const { id, token } = credentials

            try {
                logic.retrieveUser(id, token)
                    .then(user => {
                        this.setState({user: user.user })
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

    handleCheck(event)  {
        event.preventDefault()
        console.log('called')
    }

   

   

    render() {
        const {
            state: { view, error, user, favs },
            handleRegister,
            handleLogin, handleLogout,
            handleDrumkit
        } = this

        return (
        <>
            <header>
                {user && <p>Hello, {user.name}</p>}
                <nav>

                    {!user ? <ul>
                        <li><a href="" onClick={handleRegister}>Register</a></li>
                        <li><a href="" onClick={handleLogin}>Login</a></li>
                    </ul> : <ul>
                            {view === 'search' && <li><a href="" onClick={event => {
                                event.preventDefault()

                                handleFavorites()
                            }}>Favorites</a></li>}
                            <a href="" onClick={handleDrumkit}>Drumkit</a>
                            {view === 'favorites' && <li><a href="" onClick={handleGoToSearch}>Search</a></li>}
                            <li><a href="" onClick={handleLogout}>Logout</a></li>
                        </ul>}

                </nav>
            </header>
            <img src="../imgs/logo.png" alt="" />
            
            


            

            
            {view === 'favorites' && <>
                <h3>Favorites</h3>
                <Results items={favs} paintItem={duck => {
                    return <DuckDetail duck={duck} onToggle={handleToggleFavDuckFromFavorites} />
                }} onItem={handleRetrieveDuck} />
            </>}
        </>
        )
    }
}