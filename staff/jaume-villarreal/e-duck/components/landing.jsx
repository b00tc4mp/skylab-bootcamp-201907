const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [], duck: undefined , login : false , register : false}

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
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

    render() {
        return <>
            <a href="">Register</a>
            <a href="">Login</a>
            <Search onSearch={this.handleSearch} />

            {!this.state.duck ?
                <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} />
                }} onItem={this.handleRetrieveDuck} />
                :
                <DuckDetail duck={this.state.duck} onBack={() => this.setState({ duck: undefined})} />}
        </>
    }
}