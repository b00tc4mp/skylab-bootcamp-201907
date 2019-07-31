class DuckHome extends Component{
    
    constructor(container){
        super(container)

        const search = new Search(container.getElementsByClassName('search')[0])
        this.search = search;
    
        const results = new DuckResults(container.getElementsByClassName('duck-results')[0])
        this.results = results;
    
        const detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0])
        this.detail = detail;

        const favorites = new DuckFavorites(container.getElementsByClassName('duck-favorites')[0])
        this.favorites = favorites

        const feedback = new Feedback(container.getElementsByClassName('feedback')[0])
        feedback.hide()
        this.feedback = feedback
        
    }

    onClickLogout = expression => {
        var logout = this.container.children[1]
    
        logout.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }

    onClickFavorites = expression => {
        var favorite = this.container.children[2]
    
        favorite.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }



    showFeedback = message => {
        this.feedback.setMessage(message)
        this.feedback.show()
    }

    show() {

        this.feedback.hide()
        super.show()
        this.results.hide()
        
        //this.show(); // ERROR infinite recursion loop
        //  Component.prototype.show.call(this)
    
    }
}

/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
