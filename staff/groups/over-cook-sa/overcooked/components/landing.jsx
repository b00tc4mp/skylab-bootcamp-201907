const { Component } = React

class Landing extends Component {
    constructor () {
        super()

        this.state = { view: 'header', mealRandom: null }
        this.onRandomRecipe = this.onRandomRecipe.bind(this)

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
  
    render() {

        const { state: { view, mealRandom } } = this

        return <>
            <header>
                <BigHeader />
            </header>
            <main>
                {mealRandom && <RecipeItem meal={mealRandom} />}
            </main>
            <footer>
                <Footer />
            </footer>

        </>
    }

}