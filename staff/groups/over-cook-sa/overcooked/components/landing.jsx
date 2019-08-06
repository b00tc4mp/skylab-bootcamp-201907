const { Component } = React

class Landing extends Component {
    constructor () {
        super()

        this.state = { view: 'header'}
        this.onRandomRecipe = this.onRandomRecipe.bind(this)

    }

    componentWillMount(){
        this.onRandomRecipe()
    }

    onRandomRecipe = () => {
        logic.retrieveRandomRecipe()
        .then(meal => {
            //console.log(meal)
            
        })
    }
  
    render() {

        const { state: { view } } = this

        return <>
            <header>
                <BigHeader />
            </header>

            <footer>
                <Footer />
            </footer>

        </>
    }

}