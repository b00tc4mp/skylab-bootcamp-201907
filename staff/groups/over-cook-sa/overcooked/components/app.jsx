const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', credentials: undefined }


        this.handleCredentials = this.handleCredentials.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }


    handleCredentials(credentials){
        this.setState({ credentials , view: 'home'})
    }
    
    handleLogout(){
        this.setState({ credentials: undefined, view: 'landing' })
    }

    render() {

        const { state: { view, credentials }, handleCredentials, handleLogout } = this

        return (
        <>
        
        {!credentials ? 
        view === 'landing' && <Landing onCredentials={handleCredentials} /> 
        : view === 'home' && <Home onLogout={handleLogout} credentials={credentials} /> }
        

        </>
        )
    }
}