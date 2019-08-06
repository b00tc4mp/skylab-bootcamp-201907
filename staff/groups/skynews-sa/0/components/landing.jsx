const {Component}= React 

class Landing extends Component{
    constructor(){
        super()
        this.state={value:undefined, news:[], article:undefined}

        this.handleLogin=this.handleLogin.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveArticle=this.handleRetrieveArticle.bind(this)
        this.handleBackFromDetail=this.handleBackFromDetail.bind(this)
    }

    handleBackFromDetail() {
        const { state: { value }} = this
        logic.searchNews(value)
            .then(news => this.setState({ news, article: undefined }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleRegister(event){
        event.preventDefault()
        this.props.onRegister()
    }
    handleLogin(event){
        event.preventDefault()
        this.props.onLogin()
    }
    handleSearch(value){
        /* console.log(value, "correct") */
        logic.searchNews(value)
        .then(news=>this.setState({news,value}))
        .then(() => console.log("p:",this.state.news))
    }
    handleRetrieveArticle(item){
        console.log("workds",item)
        this.setState({article:item})
        
    }

    render(){
        const {state:{news, article},
        handleLogin,handleRegister,handleSearch,
        handleRetrieveArticle, handleBackFromDetail}=this

        return <>
        <header>
            <nav className="nav">
                <ul>
                    <li><a href="" className="register" onClick={handleRegister}>Register</a></li>
                    <li><a className="login" href=""onClick={handleLogin}>Login</a></li>
                </ul>
            </nav>
             <h1 className='landing__title hide'>SkyNews</h1>
             <img className="logo" src="style/img/skynews-logo.png"></img> 
        </header>

        
        <Search onSearch={handleSearch}/>
        {!article?
        <Results items={news} paintItem={article => {
            return <ArticleItem article={article}/>
        }} onItem={handleRetrieveArticle}/>
        :
        <ArticleDetail article={article} onBack={handleBackFromDetail}/>}
        </>
    }
}

