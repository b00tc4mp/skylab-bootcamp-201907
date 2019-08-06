const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing' }


        

    }

        
  

    


    render() {

        const { state: { view }, handleRegister } = this

        return <>

            
            
            {view === 'landing' && <Landing />}

        </>
    }
}