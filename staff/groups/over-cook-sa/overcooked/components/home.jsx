const { Component } = React

class Home extends Component { 
    constructor() {
        super()
        this.state =  { meals: [], meal: undefined, favs: [], query: undefined, searchCategory:undefined, searchIngredient:undefined, error: undefined, view: 'home', cats: true, back: true}

        this.handleLogout = this.handleLogout.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleOnMeal = this.handleOnMeal.bind(this)
        this.handleSearchCat = this.handleSearchCat.bind(this)
        this.handleGoToCategories = this.handleGoToCategories.bind(this)
        this.handleSearchIngredient = this.handleSearchIngredient.bind(this)
        this.handleToggleRecipeDetail = this.handleToggleRecipeDetail.bind(this)
        this.handleToggleRecipeList = this.handleToggleRecipeList.bind(this)
        this.handleFavorites = this. handleFavorites.bind(this)
        this.handleRetrieveMeal= this.handleRetrieveMeal.bind(this)
    }

    handleLogout(){
        this.props.onLogout()
    }

    handleSearch(query) {
        const { props: { credentials } } = this
       

        let id = credentials.id
        let token = credentials.token

        logic.searchByName(id, token, query)
        .then(meals =>  this.setState( { meals, query, cats: false, meal : undefined, searchIngredient: undefined, searchCategory : undefined}))
        .catch(({ message }) => this.setState({error: message}))
    }

    handleToggleRecipeDetail(idMeal) {
        const { props: { credentials } , handleOnMeal } = this

        let id = credentials.id
        let token = credentials.token

        logic.toggleFavMeal(id, token, idMeal)
        .then(() => handleOnMeal(idMeal))
        .catch(({ message }) => this.setState({ error: message}))
    }

    handleToggleRecipeList(idMeal) {
        const { props: { credentials }, handleSearch, handleSearchCat, handleSearchIngredient, state: { query, searchIngredient, searchCategory } } = this

        let id = credentials.id
        let token = credentials.token

        logic.toggleFavMeal(id, token, idMeal)
        .then(() => {
            if(query) handleSearch(query)
            if(searchCategory) handleSearchCat(searchCategory)
            if(searchIngredient) handleSearchIngredient(searchIngredient)
        })
        .catch(({ message }) => this.setState({ error: message}))
    }


    handleSearchCat(searchCategory) {
        const { props: { credentials } } = this
   

        let id = credentials.id
        let token = credentials.token

        logic.showCategory(id, token, searchCategory)
        .then(meals =>  this.setState( { meals, searchCategory, cats: false, searchIngredient: undefined, query : undefined}))
        .catch(({ message }) => this.setState({error: message}))
    }

    handleSearchIngredient(query) {
        const { props: { credentials } } = this
   

        let id = credentials.id
        let token = credentials.token

        logic.searchIngredient(id, token, query)
        .then(meals =>  this.setState( { meals, searchIngredient: query, cats: false, meal : undefined, searchCategory : undefined}))
        .catch(({ message }) => this.setState({error: message}))
    }

    handleGoBack(){

        const { handleSearch, handleSearchCat, handleSearchIngredient, state: { query, searchIngredient, searchCategory } } = this

            if(query) handleSearch(query)
            if(searchCategory) handleSearchCat(searchCategory)
            if(searchIngredient) handleSearchIngredient(searchIngredient)
       
        this.setState({ meal: undefined })
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
        this.setState({ cats: true, meals: [], meal: undefined })
    }

    handleFavorites() {
        const {props: { credentials } } = this

        let id = credentials.id
        let token = credentials.token

        logic.retrieveFavMeal(id, token)
            .then(favs => this.setState({ favs }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleToggleFavorite(idMeal){
        const {props: { credentials } } = this

        let id = credentials.id
        let token = credentials.token
        logic.toggleFavMeal(id, token, idMeal)
            .then(()=> this.handleFavorites())
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRetrieveMeal(idMeal) {
        const {props: { credentials } } = this

        let id = credentials.id
        let token = credentials.token

        logic.retrieveRecipe(id, token, idMeal)
            .then(meal => this.setState({ meal }))
            .catch(({ message }) => this.setState({ error: message }))
    }


 
render () {

    const{ state: { meals, meal, cats}, handleLogout, handleSearch, handleGoBack, handleOnMeal, handleSearchCat, handleGoToCategories, handleSearchIngredient, handleToggleRecipeDetail, handleToggleRecipeList, handleFavorites} = this

    return ( <>
    <header>
        <SmallHeader onLogout={handleLogout} goToCategories={handleGoToCategories} user={this.props.user} handleFavorites={handleFavorites}  />
        <Search onSearchName={handleSearch} onSearchIngredient={handleSearchIngredient}/>
    
        
    </header>
    <main>
        
        <section>     
            {cats && <Categories onSearchCat={handleSearchCat} /> } 
            {!meal ? <Results meals={meals} onMeal={handleOnMeal} goCat={handleGoToCategories} paintMeal = { meal => {return <RecipeItem2 meal={meal} onToggle={handleToggleRecipeList} />}}  />
            : <RecipeDetails meal={meal} onBack={handleGoBack} onToggle={handleToggleRecipeDetail} />}
        </section>

       
    </main>
    </>
    )    
  }
}