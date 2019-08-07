const { Component } = React

class Home extends Component {
    constructor() {
        super()
        this.state =  { meals: [], meal: undefined, query: undefined, error: undefined }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleLogout(){
        this.props.onLogout()
    }

    handleSearch(query) {
        const { props: { credentials } } = this

        let id = credentials.id
        let token = credentials.token

        logic.searchByName(id, token, query)
        .then(meals =>  this.setState( { meals, query}))
        .catch(({ message }) => this.setState({error: message}))
    }

render () {

    const{ state: {meals}, handleLogout, handleSearch} = this

    return ( <>
    <header>
        <SmallHeader onLogout={handleLogout} />
        <Search onSearchName={handleSearch} />
    </header>

    <main> 
   
    {meals.length !== 0 && <Results meals={meals} paintMeal = { meal => {return <RecipeItem2 meal={meal}/>}} />}
    </main>

    <footer>
        <Footer />
    </footer>

    </>
    )
    
  }
}