
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            landing: true,
            openRegister: false,
            openLogin: false,
            openFav: false
        }
    }
    render() {
        return <>
            {this.state.landing && <button onClick={event => {
                event.preventDefault()
                this.setState({ landing: false, openRegister: true })
            }}>Register</button>
            }
            {this.state.openRegister && <Register back={() => this.setState({ landing: true, openRegister: false })} />}

            {this.state.landing && <button onClick={event => {
                event.preventDefault()
                this.setState({ landing: false, openLogin: true, openRegister: false })
            }}>Login</button>
            }

            {this.state.landing && <button onClick={event => {
                event.preventDefault()
                this.setState({ openFav: true, landing: false })
            }}>To Favourites</button>
            }

            {this.state.fav && <Favorite />}


            {this.state.openLogin && <Login back={() => this.setState({ landing: true, openLogin: false })} />}

            {this.state.landing && <Landing />}



        </>
    }




}