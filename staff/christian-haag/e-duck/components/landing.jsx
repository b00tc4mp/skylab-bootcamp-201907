
const { Component } = React

class Landing extends Component {
    constructor() {
        super()
        this.state = { ducks: [], duck: null }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck = this.handleRetrieveDuck.bind(this)
    }

    handleSearch(query) {
        logic.searchDucks(query, (error, ducks) => {
            if (error) console.error(error)
            else this.setState({ ducks })
        })
    }

    handleRetireveDuck(id) {
        logic.retrieveDuck(id, (error, duck) => {
            if (error) console.error(error)
            else this.setState({ duck })
        })
    }

    render() {
        return <>
            <Search onSearch={this.handleSearch} />
            {!this.state.duck ?
                <Results items={this.state.ducks} paintItem={duck => {
                    return <DuckItem duck={duck} ondetail={this.handleDetail}
                        onItemClicked={this.handleRetrieveDuck} />
                }}
                :
                <DuckDetail duck={this.state.duck} onBack={this.setState({ duck: undefined })} />}

        </>
    }
    duckDetail(duck: { title, imageUrl, price, description, link }, onBack) {
        return <>
            <h3>{title}</h3>
            <img src={imageUrl} />
            <p>{price}</p>
            <p>{description}</p>
            <a href={link}></a>
            <a href="#" onClick={event = > {
                event.preventDefault()
                onback()
            }}>Go Back</a>
        </>
    }
}








