const { Component } = React

class Landing extends Component {
    constructor() {
        super()

        this.state = { ducks: [],duck:undefined }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleRetrieveDuck=this.handleRetrieveDuck.bind(this)
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

            {!this.state.duck && /* cuando no hay pato se muestra cuando hay se muestra la segunda */ <Results items={this.state.ducks} paintItem={duck => {
                return <DuckItem duck={duck} />
            }} onItemClicked=/* {id=> *//* {
                console.log(id)
            } */{this.handleRetrieveDuck} />
            <DuckDetails />
        </>
    }
    handleRetrieveDuck(id){
        logic.handleRetrieveDuck(id,(error,duck)=>{
            if(error)console.error(error)
            else this.setState({duck})

        })
    }

    function DuckDetail({ duck: { title, imageUrl, price ,descprition,link}){
            return <>
            <h3>{title}</h3>
            <img src={imageUrl} />
            <span>{price}</span>
            <p>{description}</p>
            <a href=""></a>
            //button para ir atras hacer un onBack 
            <a href="#" onClick=>{event=>{
                event.preventDefault()
                onBack()
            }}>Go back</a>
        </>
    }
}
