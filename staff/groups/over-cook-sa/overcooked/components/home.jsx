const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state =  { meals: [], meal: undefined, user: undefined, favs: [], query: undefined, searchCategory: undefined, searchIngredient:undefined, error: undefined, view: 'home', cats: true, back: true}

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
        this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
    }

    componentWillMount() {
        const { props: { credentials: { id, token } } } = this
        logic.retrieveUser(id, token)
            .then(user => {
                this.setState({ user })
            })
    }

    handleLogout() {
        this.props.onLogout()
    }

    handleSearch(query) {
        const { props: { credentials } } = this

        let id = credentials.id
        let token = credentials.token

        logic.searchByName(id, token, query)
        .then(meals =>  {
            this.setState( { favs:[], meals, query, cats: false, meal : undefined, searchIngredient: undefined, searchCategory : undefined})
     
        })
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
        .then(meals =>  this.setState( { favs:[], meals, searchCategory, cats: false, meal: undefined, searchIngredient: undefined, query: undefined}))
        .catch(({ message }) => this.setState({error: message}))

    }

    handleSearchIngredient(query) {
        const { props: { credentials } } = this

        let id = credentials.id
        let token = credentials.token

        logic.searchIngredient(id, token, query)

        .then(meals =>  this.setState( { favs:[], meals, searchIngredient: query, cats: false, meal : undefined, searchCategory : undefined, query: undefined}))
        .catch(({ message }) => this.setState({error: message}))
    }

    handleGoBack(){

        const { handleSearch, handleSearchCat, handleSearchIngredient, handleFavorites, state: { query, searchIngredient, searchCategory } } = this
        if(query || searchCategory || searchIngredient){
            if(query) handleSearch(query)
            if(searchCategory) handleSearchCat(searchCategory)
            if(searchIngredient) handleSearchIngredient(searchIngredient)
        }     
        else handleFavorites()
               
        this.setState({ meal: undefined })
    }

    handleOnMeal(idMeal) {
        const { props: { credentials } } = this
        let id = credentials.id 
        let token = credentials.token

        logic.retrieveRecipe(id, token, idMeal)
            .then(meal => {
                this.setState({ meal })})
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleGoToCategories() {
        this.setState({ favs:[], cats: true, meals: [], meal: undefined })
    }

    handleFavorites() {
        const {props: { credentials }} = this
        
        let id = credentials.id
        let token = credentials.token

        logic.retrieveFavMeal(id, token)
            .then(favs => {this.setState({ query: undefined, searchCategory: undefined, searchIngredient:undefined, cats:false, favs, meal: undefined, meals: []})})
           
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

    const{ state: { meals, meal, cats , favs, user}, showCat, handleLogout, handleSearch, handleGoBack, handleOnMeal, handleSearchCat, handleGoToCategories, handleSearchIngredient, handleToggleRecipeDetail, handleToggleRecipeList,handleToggleFavorite, handleFavorites} = this

    return ( <>
    <header className='home'>
       
            {user && <SmallHeader onLogout={handleLogout} goToCategories={handleGoToCategories} showCat={showCat} user={user} handleFavorites={handleFavorites}  />}       
            <Search onSearchName={handleSearch} onSearchIngredient={handleSearchIngredient}/>
        
    </header>
    <main className="main__home">
        
        <section className="main__categories">     
            { cats && <Categories onSearchCat={handleSearchCat} /> }

            <section className="main__res">
                {!meal ? <Results meals={meals} onMeal={handleOnMeal} goCat={handleGoToCategories} paintMeal = { meal => {return <RecipeItem2 meal={meal} onToggle={handleToggleRecipeList} />}}  />
                : <RecipeDetails meal={meal} onBack={handleGoBack} onToggle={handleToggleRecipeDetail} ingredients={recipeFormatter(meal)} />}
            </section>
            <section className="main__res">
                {!meal  && <Favorites favs={favs} onMeal={handleOnMeal} goCat={handleGoToCategories} paintMeal = { meal => {return <RecipeItem2 meal={meal} onToggle={handleToggleFavorite} />}}  />
                }
            </section>
        </section>

    </main>

    <footer className="footer">
        <Footer />
    </footer>
    </>
    )    
  }
}
