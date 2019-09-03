

const { Component } = React
class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [] }

        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    render() {
        return <>
            <Search onSearch={this.handleSearch} />

            <Results items={this.state.ducks} paintItem={duck => {
                return <DuckItem duck={duck} />
            }} />
        </>
    }
}




ReactDOM.render(<Landing />, document.querySelector('#root'))