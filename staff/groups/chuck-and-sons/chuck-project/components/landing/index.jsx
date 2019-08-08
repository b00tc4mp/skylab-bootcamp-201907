class Landing extends React.Component{
    constructor(){
        super()

        this.state = {view : 'search'}
    }


    render(){

        const {state: { view } } = this

        return <>
            {view === 'search' && <p>This is the landing page</p>}
        </>
    }
}