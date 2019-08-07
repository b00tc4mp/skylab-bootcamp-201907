const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', credentials: undefined }


        this.handleCredentials = this.handleCredentials.bind(this)
    }


    handleCredentials(credentials){
        this.setState({ credentials })
        this.setState({ view: 'home'})
    }
    

    render() {

        const { state: { view, credentials }, handleCredentials } = this

        return (
        <>
        
        {!credentials ? 
        view === 'landing' && <Landing onCredentials={handleCredentials} /> 
        : view === 'home' && <Home /> }
        
        </>
        )
    }
}