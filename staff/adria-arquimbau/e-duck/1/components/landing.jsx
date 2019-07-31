const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined, visible:"landing"}


        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleVisible = this.handleVisible.bind(this)


    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    handleRetrieveDuck(id) {
        logic.retrieveDuck(id, (error, duck) => {
            if (error) console.error(error)
            else this.setState({ duck })
        })
    }

    handleRegister(name, surname, email, password) {
            try {
                logic.register(name, surname, email, password)
            } catch (error) {
                console.error(error)
            }
    }

    handleLogin(email, password) {
        try {
            logic.login(email, password)
        } catch (error) {
            console.error(error)
        }
    }

    

    handleVisible(panel){
        this.setState({ visible:panel })
    }
    

    render() {
        return <>
            <InitialButton  handleVisible={this.handleVisible}/>

           

            {this.state.visible === "register" && <Register  onRegister={this.handleRegister} onBack={() => this.setState({ visible: "landing", ducks : [] })} />}

            {this.state.visible === "login" && <Login  onLogin={this.handleLogin} onBack={() => this.setState({ visible: "logged", ducks : [] })} />}

            {this.state.visible === "logged" &&  <LoggedButton />}
            {this.state.visible === "logged" &&  <Search />}
            
            

            {this.state.visible === "landing" && <Search onSearch={this.handleSearch} />}
            
            {!this.state.duck ?
                this.state.visible === "landing" && <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} />
                }} onItem={this.handleRetrieveDuck} /> : this.state.visible === "landing" && <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}

            
            
            
            
        </>
    }
}