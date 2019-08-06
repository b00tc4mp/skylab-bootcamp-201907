const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing' }


        this.handleRegister = this.handleRegister.bind(this)

    }

        
    


    

    handleRegister(name, surname, email, password, repassword) {
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'register-success' }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    render() {

        const { state: { view }, handleRegister } = this

        return <>

            
            {view === "landing" && <Register onRegister={handleRegister} />}
            {view === 'landing' && <Landing />}

        </>
    }
}