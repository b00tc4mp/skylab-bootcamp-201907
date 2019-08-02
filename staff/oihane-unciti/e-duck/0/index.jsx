


/* 
class Detail extends Component {
    constructor (){

        super()

        this.state = { duck: {} }
        this.displayDetails = this.displayDetails.bind(this)
    }

    displayDetails(id){
        logic.retrieveDuck(id, (error, duck) => {
            if(error) console.error(error)
            else this.setState({duck})
        })
    }
        

}

function onDetail(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <input type="text" name="query" />
        <button>🔍</button>
    </form>
}

/* function detailDuck(props) {
    return <>
    <h3>{title}</h3>
    <img src={imageUrl} />
    <span>{price}</span>
    <p>{description}</p>
    <a href="">{link} </a>
</>
}
 */





ReactDOM.render(<App />, document.querySelector('#root'))