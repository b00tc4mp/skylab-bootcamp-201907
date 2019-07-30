const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [] , selectedDuck : undefined }

        this.handleSearch = this.handleSearch.bind(this)

        this.handleSelectedDuck = this.handleSelectedDuck.bind(this)
    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    handleSelectedDuck(id) {
        logic.retrieveDuck(id , (error , selectedDuck) => {
            if (error) console.log(error.message)
            else this.setState({selectedDuck})
            console.log(id)
        })
    }

    render() {
        return <div>
            <Search onSearch={this.handleSearch} />

            <Results items={this.state.ducks} paintItem={duck => {
                return <DuckItem duck={duck} onItemClicked={this.handleSelectedDuck} />
            }} onItemClicked={this.handleSelectedDuck}/>
        </div>
    }
}

function DuckDetail({duck : {title , price , description , link ,v }}){

}