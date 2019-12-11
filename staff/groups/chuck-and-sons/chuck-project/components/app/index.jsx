class App extends React.Component {
    constructor() {
        super()

        let credentials

        const { id, token } = sessionStorage


        id && token && (credentials = { id, token })

        this.state = {
            view: 'landing',
            error: undefined,
            printItem: undefined,
            credentials,
            query: undefined,
            user: undefined,
            categories: [],
            jokes: [],
            random: [],
            dropDown: false

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
        this.handleLogout = this.handleLogout.bind(this)
        this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
        this.handleDroppdown = this.handleDroppdown.bind(this)
    }

    // ===
    componentWillMount() {
        const { state: { credentials } } = this
        if (credentials) {
            const { id, token } = credentials
            try {
                logic.retrieveUser(id, token)
                    .then(user => this.setState({ user }))
                    .catch(({ message }) => this.setState({ error: message }))
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }

    }

    /**
     * Sets credentials if they exist in sessionStorage
     * Invoques logic.retrieveUser if credentials are defined
     * Invoques logic.getCategories
     */
    componentDidMount() {
        logic.getCategories()
            .then(data => {
                this.setState({ categories: data, printItem: 'welcome' })
            })
    }

    /**
    * Handles a query search
    * Invoques logic.searchJokes
    *
    * @param {String} query search => received from Search component.
    */
    handleSearch(query) {
        const { state: { credentials } } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchJokes(id, token, query)
            .then(joke => {
                this.setState({ jokes: joke, query: query })
                this.setState({ printItem: 'printSearch', dropDown: false })
            })

            .catch(({ message }) => this.setState({ error: message }))
    }

    /**
    * Handles dropdown menu of categories button
    */
    handleDroppdown() {
        const { state: { dropDown } } = this
        if (!dropDown) {
            this.setState({ printItem: 'dropDown', dropDown: true })
        } else {
            this.setState({ printItem: undefined, dropDown: false })
        }
    }


    /**
    * Handles a category search
    * Invoques logic.searchJokes
    *
    * @param {String} category search => received from Search component.
    */
    handleSearchCategories(category) {
        const { state: { credentials } } = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)

        logic.searchJokes(id, token, category)
            .then(joke => {
                this.setState({ jokes: joke, query: category })
                this.setState({ printItem: 'printCategory', dropDown: false })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }


    /**
    * Handles queries from a random button
    * Invoques logic.getRandomJoke
    */
    handleRandomButton() {
        logic.getRandomJoke()
            .then(joke => {
                this.setState({ random: joke, printItem: 'printRandom', dropDown: false })
                //this.setState({ printItem: 'printRandom', dropDown: false })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    /**
    * Handles a synth joke play
    * Invoques logic.getRandomJoke
    * @param {String} joke id => received from RetrieveCategories component
    */
    handleStartSynth(value) {
        logic.synth(value)
    }

    /**
    * Handles view change
    */
    handleGoToRegister() {
        this.setState({ view: 'register' })
        this.setState({ error: undefined })
    }

    /**
    * handles view change
    */
    handleGoToLogin() {
        this.setState({ view: 'login' })
        this.setState({ error: undefined })
    }

    /**
    * Handles view change
    */
    handleGoToLanding() {
        this.setState({ view: 'landing' })
        this.setState({ error: undefined })
    }

    /**
    * Handles register process => received from Register component
    * Invoques logic.registerUser
    *
    * @param {String} name [submit value]
    * @param {String} surname [submit value]
    * @param {String} username [submit value]
    * @param {String} password [submit value]
    * @param {String} repassword [submit value]
    */
    handleRegister(name, surname, username, password, repassword) {
        try {
            logic.registerUser(name, surname, username, password, repassword)
                .then(this.setState({ view: 'register-success' }))
                .catch(({ message }) => this.setState({ error: message }))
        }
        catch ({ message }) {
            this.setState({ error: message })
        }
    }

    /**
    * Handles login process => received from Login component
    * Invoques logic.authenticateUser
    * Invoques logic.retrieveUser
    *
    * @param {String} password [submit value]
    * @param {String} repassword [submit value]
    */
    handleLogin(username, password) {

        try {
            logic.authenticateUser(username, password)
                .then(credentials => {
                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token
                    this.setState({ view: 'landing', credentials })

                    const { id, token } = credentials

                    try {
                        logic.retrieveUser(id, token)
                            .then(user => this.setState({ user }))
                            .catch(({ message }) => this.setState({ message }))
                    } catch ({ message }) {
                        this.setState({ error: message })
                    }

                })
                .catch(({ message }) => this.setState({ error: message }))
        }
        catch ({ message }) { this.setState({ error: message }) }
    }

    /**
    * Handles logout process => received from Header component
    */
    handleLogout() {
        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ credentials: undefined, user: undefined, printItem: undefined })
    }

    /**
    * Handles  favorite toogle process 
    * Invoques logic.toogleFavoriteItem
    */
    handleToggleFavorite(jokeId) {

        const { state: { credentials, query }, handleSearch } = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)
        credentials ? logic.toggleFavoriteItem(id, token, jokeId)
            .then(() => handleSearch(query))
            .catch(({ message }) => this.setState({ error: message }))
            : this.setState({ view: 'login' })
    }

    render() {
        const {
            state: { view, error, categories, user, jokes, printItem, random, query, credentials },
            handleGoToRegister,
            handleGoToLogin,
            handleGoToLanding,
            handleRegister,
            handleLogin,
            handleLogout,
            handleToggleFavorite,
            handleSearch,
            handleSearchCategories,
            handleRandomButton,
            handleDroppdown,
            handleStartSynth
        } = this

        return <>
            <div className="wrapper">
                <Header onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onLogout={handleLogout} onChangeView={view} user={user} credentials={credentials} />

                {view === 'login' && <Login onGoToLanding={handleGoToLanding} onLogin={handleLogin} error={error} />}
                {view === 'register' && <Register onGoToLanding={handleGoToLanding} onRegister={handleRegister} error={error} />}
                {view === 'register-success' && <RegisterSuccess onGoToLanding={handleGoToLanding} onGoToLogin={handleGoToLogin} />}

                {view === "landing" && <main className="main-container">
                    <div className="search-random-box">
                        <Search onSearch={handleSearch} query={query} error={error} />
                        {<button className="random-button" onClick={event => {
                            event.preventDefault()
                            handleRandomButton()
                        }}>Random Chuck</button>}
                    </div>

                    <button className="btn btn__categories" onClick={(event) => {
                        event.preventDefault()
                        handleDroppdown()
                    }}>Categories</button>

                    {printItem === 'welcome' && <>
                        <section className="welcome-mssg">
                            <h3>Wellcome</h3><p>to the chuck joke generator</p><p>You can search a joke by categories,<br />get a random Chuck or just<br />have fun!</p>
                        </section>
                    </>}
                    {printItem === 'dropDown' && <Categories categories={categories} searchCategory={handleSearchCategories} />}

                    {printItem === 'printSearch' && <RetrieveCategories arrayJokes={jokes} startSynth={handleStartSynth} onToggle={handleToggleFavorite} error={error} />}

                    {printItem === 'printCategory' && <RetrieveCategories user={user} arrayJokes={jokes} startSynth={handleStartSynth} onToggle={handleToggleFavorite} />}

                    {printItem === 'printRandom' && <RetrieveRandom arrayRandom={random} startSynth={handleStartSynth} ontoggle={handleToggleFavorite} />}
                </main>}


            </div>
        </>
    }

}