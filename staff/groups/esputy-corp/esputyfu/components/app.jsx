class App extends React.Component {
    constructor() {
        super()

        this.state = { view: 'undefined', credentials: {} }

        this.handleLogin = this.handleLogin.bind(this)

    }

    handleLogin(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(user => {
                    this.setState({ credentials: user })
                    this.setState({ view: 'landing' })
                })
                .catch(console.error)

        } catch {
            console.error(error)
        }
    }

    render() {
        return <>
            <Login onLogin={this.handleLogin} />
        </>
    }
}