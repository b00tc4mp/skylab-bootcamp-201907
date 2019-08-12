const {Component}= React 

class Landing extends Component{
    constructor(){
        super()


        this.state={ view: 'search', category: undefined, country: undefined, query:undefined, news:[], article:undefined, error: undefined, user: undefined, favs: [],weather:undefined}
        
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveArticle=this.handleRetrieveArticle.bind(this)
        this.handleBackFromDetail=this.handleBackFromDetail.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
        this.handleToggleFavArticleFromArticleDetail=this.handleToggleFavArticleFromArticleDetail.bind(this)
        this.handleAcceptError=this.handleAcceptError.bind(this)
        this.handleFavorites=this.handleFavorites.bind(this)
        this.handleGoToSearch=this.handleGoToSearch.bind(this)
        this.handleToggleFavArtFromFavorites=this.handleToggleFavArtFromFavorites.bind(this)
        this.handleWeather=this.handleWeather.bind(this)
        this.handleSearchAdvanced=this.handleSearchAdvanced.bind(this)
        this.handleGoToSearchAdvanced=this.handleGoToSearchAdvanced.bind(this)
        this.handleBackFromSearchAdvanced=this.handleBackFromSearchAdvanced.bind(this)

    }

    componentWillMount() {
        const { props: { credentials } } = this
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
        try{          
            logic.weather()
            .then(weather=>{
                var a=weather
                this.setState({weather:a})})
        }catch({error}){
        }
    }

    handleSearch(category, country){
        /* console.log(value, "correct") */
        this.props.onSpinning()
        try{
        logic.searchNews(category, country)
        .then(news=>this.setState({news, category, country, error:undefined}))
        .catch(({message}) => this.setState({error: message}))
        .then(()=> this.props.onStopSpinning())
        }catch({message}){
            this.setState({error:message})
            this.props.onStopSpinning()
        }
    }

    handleSearchAdvanced(query){
        this.props.onSpinning()
        try{
        logic.searchNewsAdvanced(query)
        .then(news=>this.setState({news, query, error:undefined}))
        .catch(({message}) => this.setState({error: message}))
        .then(()=> this.props.onStopSpinning())
        }catch({message}){
            this.setState({error:message})
            this.props.onStopSpinning()
        }
    }

    handleGoToSearchAdvanced() {
        this.setState({ view: 'searchAdv', article: undefined })
    }
    handleBackFromSearchAdvanced() {
        this.setState({ view: 'search', article: undefined })
    }

    handleRetrieveArticle(item){
        const {props : {credentials}} = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)
        
        id && token && logic.retrieveArticle(id, token, item)
        .then((article) => this.setState({ article }))
        id==undefined && token==undefined && logic.retrieveArticle(id, token, item)
        this.setState({article:item})
    }

    handleRegister(event){
        event.preventDefault()
        this.props.onRegister()
    }

    handleBackFromDetail() {
        const { state: { category, country }} = this
        logic.searchNews(category, country)
            .then(news => this.setState({ news, article: undefined, view:"search" }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleLogin(event){
        event.preventDefault()
        this.props.onLogin()
    }

    handleLogout(event){
        event.preventDefault()

        const { props: { onLogout } } = this

        this.setState({ user: undefined, view: 'search'}, () =>
        onLogout())

        delete sessionStorage.id
        delete sessionStorage.token
        this.setState({ credentials: undefined })
    }
  
    handleToggleFavArticleFromArticleDetail(article){
        const {props : { onLogin, credentials}, handleRetrieveArticle} = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)
        
        credentials ? logic.toggleFavArt(id, token, article)
        .then(() => handleRetrieveArticle(article))
        .catch(({ message}) => this.setState( { error : message})) 
        : onLogin()
    } 

    handleAcceptError() {
        this.setState({ error: undefined })
    }

    handleFavorites() {
        const { props: {credentials}} = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveFavNews(id, token)
            .then(favs => this.setState({ view: 'favorites', article:undefined , favs}))
            .catch(({ message }) => this.setState({ error: message}))
    }

    handleGoToSearch(event) {
        event.preventDefault()
        this.setState({ view: 'search' })
    }

    handleToggleFavArtFromFavorites(article) {
        const { props: { onLogin, credentials}, handleFavorites} = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavArt(id, token, article).then(() => handleFavorites()).catch(({ message }) => this.setState({ error: message})) : onLogin()
    }
    handleWeather(country){
        let long=undefined
        let lat=undefined
        if (country == "de") {
            long = 52.52437
            lat = 13.41053
        }
        if (country == "fr") {
            long = 48.85341
            lat = 2.3488
            }
        if (country == "gb") {
            long = 51.50853
            lat = -0.12574
            }
        if (country == "de") {
            long = 40.730610
            lat = -73.935242
            }
        try{          
            logic.weather(long,lat)
            .then(weather=>{
                var a=weather
                this.setState({weather:a})})

        }catch({error}){
            /*TODO REVISAR */
        }
    }

    render(){
        const {
        state: { view, category, country, query , news, article, error, user, favs, weather},
        handleSearch, handleRetrieveArticle , handleRegister, handleBackFromDetail, handleLogin, handleLogout, handleToggleFavArticleFromArticleDetail, handleAcceptError, handleFavorites, handleGoToSearch, handleWeather,handleGoToSearchAdvanced , handleSearchAdvanced, handleBackFromSearchAdvanced } = this

        return <>
            <header>
                <nav className="nav">
                    {user && <p className="nav__hello">Hello, {user.name}</p>}
                    {!user ?
                        <ul className="ul">
                            <li className="li"><a href="" className="nav-but" onClick={handleRegister}>Register</a></li>
                            <li className="li"><a className="nav-but" href="" onClick={handleLogin}>Login</a></li>
                        </ul> : <ul className="ul">
                            {view === 'search' && <li className="li"><a href="" className="nav-but" onClick={event => {
                                event.preventDefault()
                                handleFavorites()
                            }}>Favorites</a></li>}
                            {view === 'searchAdv' && <li className="li"><a href="" className="nav-but" onClick={event => {
                                event.preventDefault()
                                handleFavorites()
                            }}>Favorites</a></li>}
                            {view === 'favorites' && <li className="li"><a href="" className="nav-but" onClick={handleGoToSearch}>Search</a></li>}
                            <li className="li"><a href="" className="nav-but" onClick={handleLogout}>Logout</a></li>
                        </ul>}
                </nav>
            </header>

            {view === "search" && weather && <WeatherItem weather={weather} country={country} />}

            {view === 'search' && <>

                <Search onSearch={handleSearch} error={error} category={category} country={country} onWeather={handleWeather} />
                <section className="query-search">
                <a className="go-query" href="" onClick={event => {
                    event.preventDefault()
                    this.handleGoToSearchAdvanced()
                }}>Go to query search</a></section>
                {error && <Modal message={error} onAccept={handleAcceptError} />}
                {!article ?
                    <Results items={news} paintItem={article => {
                        return <ArticleItem article={article} />
                    }} onItem={handleRetrieveArticle} />
                    :
                    <ArticleDetail article={article} onToggle={handleToggleFavArticleFromArticleDetail} onBack={handleBackFromDetail} />}
            </>}

            {view === 'searchAdv' && <>

                <SearchAdv onSearch={handleSearchAdvanced} onBack={handleBackFromSearchAdvanced} />
                {error && <Modal message={error} onAccept={handleAcceptError} />}
                {!article ? 

                    <Results items={news} paintItem={article => {
                        return <ArticleItem article={article} />
                    }} onItem={handleRetrieveArticle} />
                    :
                    <ArticleDetail article={article} onToggle={handleToggleFavArticleFromArticleDetail} onBack={handleGoToSearchAdvanced} />}
            </>}

            {view === 'favorites' && <>
                <section className="favorites">
                    <h1 className='fav__title hide'>SkyNews</h1>
                    <img className="fav-logo" src="style/img/skynews-logo.png"></img>
                    <h3 className="title">Favorites</h3>
                    {!article ?
                        <Results items={favs} paintItem={article => {
                            return <ArticleItem article={article} />
                        }} onItem={handleRetrieveArticle} />
                        :
                        <ArticleDetail article={article} onToggle={handleToggleFavArticleFromArticleDetail} onBack={handleFavorites} />}
                    {error && <Modal message={error} onAccept={handleAcceptError} />}

                </section>
            </>}
        </>
    }
}

