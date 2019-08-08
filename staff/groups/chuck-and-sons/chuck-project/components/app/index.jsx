class App extends React.Component{
    constructor(){
        super()

        let credentials

        const { id , token } = sessionStorage

        id && token && (credentials = { id , token })

        this.state = {
            view : 'landing',
            error : undefined,
            printItem: undefined,
            credentials,
            user : undefined,
            categories: [],
            jokes: [],
            random: [] 
        }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToLanding = this.handleGoToLanding.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        // ===
        this.handleSearchCategories = this.handleSearchCategories.bind(this)
        this.handleRandomButton = this.handleRandomButton.bind(this)
        this. handleLogout = this. handleLogout.bind(this)
   }

    // ===
    componentDidMount(){
        const { props : { credentials }} = this

        if (credentials){
            const { id , token } = credentials
        }

        try{
            logic.retrieveUser(id , token)
                .then( user => this.setState({ user }))
                .catch( ({ message }) => this.setState({ error : message }))
        } catch({ message }){
            this.setState({ error : message})
        }
    }

   componentDidMount() {
        logic.getCategories()
            .then(data => {
                this.setState({ categories: data })
            })
    }

    handleSearch(query){
        try{

        }
        catch({ message }){
            
        }
    }

    handleSearchCategories(category) {
        logic.searchJokes(undefined, undefined, category)
            .then(joke => {
                this.setState({ jokes: joke })
                this.setState({ printItem: 'printCategory' })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRandomButton() {
        logic.getRandomJoke()
            .then(joke => {
                this.setState({ random: joke })
                this.setState({ printItem: 'printRandom' })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    // ===

    handleGoToRegister(){
        this.setState( { view : 'register' } )
        this.setState( { error : undefined })
    }
    
    handleGoToLogin(){
        this.setState( { view : 'login' } )
        this.setState( { error : undefined })
    }

    handleGoToLanding(){
        this.setState( { view : 'landing' } )
        this.setState( { error : undefined })
    }

    handleRegister(name , surname , username , password , repassword){
        try{
            logic.registerUser(name , surname , username , password , repassword)
                .then( this.setState( { view : 'register-success' } ) )
                .catch( ({ message }) => this.setState( { error : message }))
        }
        catch({ message }){ 
            this.setState({ error : message} )}
    }

    handleLogin(username , password){
        try{
            logic.authenticateUser( username , password )
                .then(credentials => {
                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token
                    this.setState({ view : 'landing' , credentials })

                    const {id , token} = credentials

                    try{
                        logic.retrieveUser(id , token)
                            .then( user => this.setState({ user }))
                            .catch( ({ message }) => this.setState({ message }))
                    } catch({ message }){
                        this.setState({ error : message})
                    }

                })
                .catch( ({ message }) => this.setState( {error : message} ))
        }
        catch({ message }){this.setState( {error : message} )}
    }


    handleLogout(){
        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ credentials : undefined })
    }


    render(){
        const {
            state : { view , error, categories, jokes, printItem, random , user},
            handleGoToRegister,
            handleGoToLogin,
            handleGoToLanding,
            handleRegister, 
            handleLogin,
            handleLogout,
            handleSearch,
            handleSearchCategories,
            handleRandomButton
        } = this
        
        return <>
            <div className = "wrapper">
                <Header onGoToRegister = {handleGoToRegister} onGoToLogin = {handleGoToLogin} onLogout = {handleLogout} onChangeView = { view } user = { user }/>
                <Search onSearch = {handleSearch}/>
                {view === 'login' && <Login onGoToLanding = {handleGoToLanding} onLogin={handleLogin} error = { error }/> }
                { view === 'register' && <Register onGoToLanding = {handleGoToLanding} onRegister = {handleRegister} error = { error }/> }
                { view === 'register-success' && <RegisterSuccess onGoToLanding = {handleGoToLanding} onGoToLogin = {handleGoToLogin}/> }
                
                { view === "landing" && <main className="main-container">
                    {<button className="random-button" onClick={event => {
                        event.preventDefault()
                        handleRandomButton()
                    }}>Random Chuck</button>}

                    <section className="categories">
                        <Categories categories={categories} searchCategory={handleSearchCategories} />
                    </section>

                    {printItem === 'printCategory' && <>
                        <section className="results">
                            <h2>Jokes</h2>
                            <RetrieveCategories arrayJokes={jokes} />
                        </section>
                    </>}

                    {printItem === 'printRandom' && <>
                        <section className="results">
                            <h2>Your Random Chuck</h2>
                            <RetrieveRandom arrayRandom={random} />
                        </section>
                    </>}
                </main>}


            </div>            
        </>
    }

}