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
        return <div>
            {this.state.landing && <Button name = "Register" onClick = {this.handleClick} />}



            {this.state.landing && <button onClick={event => {
                event.preventDefault()
                this.setState({ landing: false, openLogin: true, openRegister: false })
            }}>Login</button>
            }

            {this.state.openLogin && <Login back={() => this.setState({ landing: true, openLogin: false })} />}

            {this.state.landing && <Landing />}

            <Button name='Register'/>
        </div>
    }

    // back() {

    // }


}