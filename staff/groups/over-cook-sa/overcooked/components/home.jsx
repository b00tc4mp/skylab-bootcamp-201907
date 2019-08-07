const { Component } = React

class Home extends Component {
    constructor() {
        super()
        this.state = {}

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(){
        this.props.onLogout()
    }

render () {

    const{ handleLogout } = this

    return <>
        <SmallHeader onLogout={handleLogout} />
        <Footer />
    </>
    
}
}