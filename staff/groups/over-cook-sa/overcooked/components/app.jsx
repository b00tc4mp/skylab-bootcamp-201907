const { Component } = React

class App extends Component {
    constructor() {
        super()

        let credentials

        const { id, token } = sessionStorage

        id && token && (credentials = { id, token })

        this.state = {credentials}


        this.handleCredentials = this.handleCredentials.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleCredentials(credentials){
        this.setState({ credentials })
    }
    
    handleLogout(){
        this.setState({ credentials: undefined })

       delete sessionStorage.id
       delete sessionStorage.token
    }

    

    render() {

        const { state: { view, credentials }, handleCredentials, handleLogout } = this

        return (
        <>
        
        {!credentials ? 
        <Landing onCredentials={handleCredentials} /> 
        :   <Home onLogout={handleLogout} /> }
        
        <footer>
            <Footer />
        </footer>
        </>
        )
    }
}