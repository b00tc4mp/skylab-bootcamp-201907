const { Component } = React

class Home extends Component {
    constructor() {
        super()
        this.state =  { meals: [], meal: undefined, query: undefined, error: undefined, view: 'home'}

        this.handleLogout = this.handleLogout.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleOnMeal = this.handleOnMeal.bind(this)
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

    handleGoBack(){
        this.setState({ meal: undefined })
    }

    handleToggle(){

    }

    handleOnMeal(idMeal){
        const {props: { credentials } } = this
        let id = credentials.id
        let token = credentials.token

        logic.retrieveRecipe(id, token, idMeal)
            .then(meal => this.setState({ meal }))
            .catch(({message}) => this.setState({ error: message }))
    }

render () {

    const{ state: {meals, meal}, handleLogout, handleSearch, handleGoBack, handleToggle, handleOnMeal } = this

    return ( <>
    <header>
        <SmallHeader onLogout={handleLogout} />
        <Search onSearchName={handleSearch} />
    </header>
    <main> 
        {!meal ? <Results meals={meals} onMeal={handleOnMeal} paintMeal = { meal => {return <RecipeItem2 meal={meal}/>}} />
        : <RecipeDetails meal={meal} onBack={handleGoBack} onToggle={handleToggle} />}
    </main>
    </>
    )
    
  }
}