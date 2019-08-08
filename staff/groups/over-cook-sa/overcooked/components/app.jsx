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
        this.handleUser = this.handleUser.bind(this)
    }

    handleCredentials(credentials){
        this.setState({ credentials })
    }

    handleUser(user){
        this.setState({ user })
    }
    
    handleLogout(){
        this.setState({ credentials: undefined })

       delete sessionStorage.id
       delete sessionStorage.token
    }

    

    render() {

        const { state: { credentials, user}, handleCredentials, handleLogout, handleUser } = this

        return (
        <>

        {!credentials ? 
        <Landing onCredentials={handleCredentials} onUser={handleUser}/>: 
        <Home onLogout={handleLogout} credentials={credentials} user={user} /> }
        
        <footer>
            <Footer />
        </footer>

        </>
        )
    }
}