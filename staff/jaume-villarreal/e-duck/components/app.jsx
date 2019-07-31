  
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            landing: true,
            openRegister: false,
            openLogin: false,
        }
    }
 
    render() {
        return <>
            {this.state.landing &&
                <button onClick={event => {
                    event.preventDefault()
                    this.setState({ landing: false, openRegister: true })
                }}>Register</button>
            }
            {this.state.openRegister && <Register back={() => this.setState({ landing: true, openRegister: false })} />}



            {this.state.landing &&
                <button onClick={event => {
                    event.preventDefault()
                    this.setState({ landing: false, openLogin: true, openRegister: false })
                }}>Login</button>
            }
            {this.state.openLogin && <Login back={() => this.setState({ landing: true, openLogin: false })} />}

            {this.state.landing && <Landing />}
        </>
    }
}