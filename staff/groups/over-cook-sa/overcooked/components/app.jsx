const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing'}

        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGotToRegister = this.handleGotToRegister.bind(this)
    } 

    handleGotToRegister() {
        this.setState({ view: 'register' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    render() {

        const { state: { view }, handleGotToRegister, handleGoToLogin } = this

        return <>
            {view === 'landing' && <Landing onRegister={handleGotToRegister} onLogin={handleGoToLogin} />}
        </>
    }
}