const { Component } = React

class App extends Component {
    constructor() {
        super()

        let credentials

        const { id, token } = sessionStorage

        id && token && (credentials = { id, token })


        this.state = {credentials, user:undefined}


        this.handleCredentials = this.handleCredentials.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleUser = this.handleUser.bind(this)
    }

    handleCredentials(credentials){
        logic.retrieveUser(credentials.id, credentials.token)
            .then(user => {
                
                this.setState({ user , credentials })
            })
    }

    handleUser(){
        
    }
    
    handleLogout(){
        this.setState({ credentials: undefined })

       delete sessionStorage.id
       delete sessionStorage.token
    }
ß
    render() {

        const { state: { credentials }, handleCredentials, handleLogout, handleUser } = this

        return (
        <>
    
        {!credentials ? 
        <Landing onCredentials={handleCredentials} onUser={handleUser}/>: 
        <Home onLogout={handleLogout} credentials={credentials} /> }


        </>
        )
    }
}