const { Component } = React

class Landing extends Component {
    constructor () {
        super()

        this.state = { view: 'first' , mealRandom: null }
        this.onRandomRecipe = this.onRandomRecipe.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToRegister = this.handleGoToRegister.bind(this)

    }

    componentWillMount(){
        this.onRandomRecipe()
    }

    onRandomRecipe = () => {
        logic.retrieveRandomRecipe()
        .then(meal => {
            //console.log(meal)
            this.setState({mealRandom : meal})
        })
    }

    handleGoToRegister() {
        this.setState({ view: 'register', mealRandom: null })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' , mealRandom: null })
    }
  

    render() {

        const { state: { view, mealRandom }, handleGoToLogin, handleGoToRegister } = this

        return <>
            <header>
                <BigHeader />
            </header>
            <main>
                <section>
                    { view === 'register' && <Register />}
                    { view === 'first' && <WelcomeAnchors onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                    { view === 'login' && <Login />}
                </section>
                <section>
                    {mealRandom && <RecipeItem meal={mealRandom} />}
                </section>
            </main>
            <footer>
                <Footer />
            </footer>

        </>
    }

}