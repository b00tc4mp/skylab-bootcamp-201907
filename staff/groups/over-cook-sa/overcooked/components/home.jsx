const { Component } = React

class Home extends Component { 
    constructor() {
        super()
        this.state =  { meals: [], meal: undefined, query: undefined, error: undefined, view: 'home', cats: true }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleOnMeal = this.handleOnMeal.bind(this)
        this.handleSearchCat = this.handleSearchCat.bind(this)
        this.handleGoToCategories = this.handleGoToCategories.bind(this)
        this.handleSearchIngredient = this.handleSearchIngredient.bind(this)
    }

    handleLogout(){
        this.props.onLogout()
    }

    handleSearch(query) {
        const { props: { credentials } } = this
        this.setState({ meal : undefined})

        let id = credentials.id
        let token = credentials.token

        logic.searchByName(id, token, query)
        .then(meals =>  this.setState( { meals, query, cats: false}))
        .catch(({ message }) => this.setState({error: message}))
    }

    handleSearchCat(query) {
        const { props: { credentials } } = this
     
        let id = credentials.id
        let token = credentials.token

        logic.showCategory(id, token, query)
        .then(meals =>  this.setState( { meals, query, cats: false}))
        .catch(({ message }) => this.setState({error: message}))
    }

    handleSearchIngredient(query) {
        const { props: { credentials } } = this
        this.setState({ meal : undefined})

        let id = credentials.id
        let token = credentials.token

        logic.searchIngredient(id, token, query)
        .then(meals =>  this.setState( { meals, query, cats: false}))
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

    handleGoToCategories() {
        this.setState({ cats: true, meals: [] })
    }

render () {

    const{ state: { meals, meal, cats }, handleLogout, handleSearch, handleGoBack, handleToggle, handleOnMeal, handleSearchCat, handleGoToCategories, handleSearchIngredient } = this

    return ( <>
    <header>
        <SmallHeader onLogout={handleLogout} goToCategories={handleGoToCategories} user={this.props.user} />
        <Search onSearchName={handleSearch} onSearchIngredient={handleSearchIngredient} />
    
        
    </header>
    <main>
        
        <section>     
            {cats && <Categories onSearchCat={handleSearchCat} /> } 
            {!meal ? <Results meals={meals} onMeal={handleOnMeal} goCat={handleGoToCategories} paintMeal = { meal => {return <RecipeItem2 meal={meal}/>}}  />
            : <RecipeDetails meal={meal} onBack={handleGoBack} onToggle={handleToggle} />}
        </section>
       
    </main>
    </>
    )
    
  }
}