const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined, user: users[0], currentPage: 'landing' }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
        this.handleFav = this.handleFav.bind(this)
        this.toRegister = this.toRegister.bind(this)
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
    handleFav(id){
        logic.addDuckToFavorites(this.state.user.email , id, error =>{
            if (error) console.error(error)
            else console.log('succeess added')            
        })
    }

    toRegister(name, surname, email, password){
        logic.register(name, surname, email, password,error =>{
            if(error) console.error(error)
            else this.setState({user})
        })
    }

    render() {
        return <>
            
            {this.state.currentPage ==='landing' && <Search onSearch={this.handleSearch} /> }
            {this.state.currentPage === 'landing' && <Register onRegister={this.toRegister}/> }
            {this.state.currentPage !== 'landing' && <Register onRegister={this.toRegister}/> }


            {!this.state.duck ?
                this.state.currentPage === 'landing' && <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} onFav={this.handleFav} />
                }} onItem={this.handleRetrieveDuck} />
                :
                this.state.currentPage === 'landing' && <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}
        </>
    }
}

/* render() {
    return <>
        
        {this.state.currentPage ==='landing' && <Search onSearch={this.handleSearch} /> }
        {this.state.currentPage === 'landing' && <RegisterOrLogin onRegister={() => this.setState({ currentPage: 'register'})} onLogin={() => this.setState({ currentPage: 'login'})} /> }
        {this.state.currentPage==='login' && <Login/> }
        {this.state.currentPage==='register' &&   <Register/>}  

        {!this.state.duck ?
            this.state.currentPage === 'landing' && <Results items={this.state.ducks} paintItem={duck => {
                return <DuckItem duck={duck} onFav={this.handleFav} />
            }} onItem={this.handleRetrieveDuck} />
            :
            this.state.currentPage === 'landing' && <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}
    </>
} */
