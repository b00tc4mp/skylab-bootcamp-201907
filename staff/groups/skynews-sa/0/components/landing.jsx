const {Component}= React 

class Landing extends Component{
    constructor(){
        super()


        this.state={ view: 'search', category: undefined, country: undefined, news:[], article:undefined, error: undefined, user: undefined, favs: []}
        
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
    }

    handleSearch(category, country){
        /* console.log(value, "correct") */
        this.props.onSpinning()
        try{
        logic.searchNews(category, country)
        .then(news=>this.setState({news, category, country, error:undefined}))
        .catch(({message}) => this.setState({error: message}))
        .then(() => console.log("p:",this.state.news))
        .then(()=> this.props.onStopSpinning())
        }catch({message}){
            this.setState({error:message})
            this.props.onStopSpinning()
        }
    }

    handleRetrieveArticle(item){
        const {props : {credentials}} = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)
        
        id && token && logic.retrieveArticle(id, token, item)
        .then((article) => this.setState({ article }))
        .then(() => this.setState({ view:"none" }))
        id==undefined && token==undefined && logic.retrieveArticle(id, token, item)
        this.setState({article:item})
        this.setState({view:"none"})
    }


    handleRegister(event){
        event.preventDefault()
        this.props.onRegister()
    }

    handleBackFromDetail() {
        const { state: { category, country }} = this
        logic.searchNews(category, country)
            .then(news => this.setState({ news, article: undefined }))
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

    render(){
        const {
        state: { view, category, country, news, article, error, user, favs},
        handleSearch, handleRetrieveArticle, handleRegister, handleBackFromDetail, handleLogin, handleLogout, handleToggleFavArticleFromArticleDetail, handleAcceptError, handleFavorites, handleGoToSearch, handleToggleFavArtFromFavorites } = this

        return <>
        <header>
            {user && <p>Hello, {user.name}</p>}
            <nav className="nav">
                {! user ?
                <ul className="nav-ul">
                    <li><a href="" className="register-li" onClick={handleRegister}>Register</a></li>
                    <li><a className="login-li" href=""onClick={handleLogin}>Login</a></li>
                </ul>: <ul>
                    {view === 'search' && <li><a href="" onClick={event => { event.preventDefault()
                    handleFavorites()}}>Favorites</a></li>}
                    {view === 'favorites' && <li><a href="" onClick={handleGoToSearch}>Search</a></li>}
                    <li><a href="" onClick={handleLogout}>Logout</a></li>
                </ul>}
            </nav>
             <h1 className='landing__title hide'>SkyNews</h1>
             <img className="nav-logo" src="style/img/skynews-logo.png"></img> 
        </header>
        {view === 'search' && !article ? <>

            <Search onSearch={handleSearch} error={error} category={category} country={country}/>

            <Results items={news} paintItem={article => {
                return <ArticleItem article={article}/>
            }} onItem={handleRetrieveArticle}/>
            </>
            :
            <ArticleDetail article={article} onBack={handleBackFromDetail} onToggle={handleToggleFavArticleFromArticleDetail}/>}
        
        

        {view === 'favorites' && <>
            <Results items={favs} paintItem={article => {
                return <ArticleDetail article={article} onToggle={handleToggleFavArtFromFavorites} />
            }} onItem={handleRetrieveArticle} />
        </>}
    </>
    }
}

