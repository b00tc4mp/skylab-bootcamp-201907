const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing' }

        this.handleGoToHome = this.handleGoToHome.bind(this)
    }

    handleGoToHome() {
        this.setState({ view: 'home'})
      }

    render() {

        const { state: { view }, handleGoToHome } = this

        return <>
            {view === 'landing' && <Landing onGoHome={handleGoToHome}/>}
            {view === 'home' && <Home />}
        </>
    }
}