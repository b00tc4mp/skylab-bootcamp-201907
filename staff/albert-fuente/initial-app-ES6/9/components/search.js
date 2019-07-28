
/**
 * Search abstraction.
 * 
 * @param {HTMLElement} container 
 */

class Search extends Component{
    constructor(container){
        super(container)
    }
    onSearch(expression) {
        const form = this.container.getElementsByTagName('form')[0]
    
        form.addEventListener('submit', event => {
            event.preventDefault()
    
            const query = form.query.value
    
            expression(query)
        })
    }

}




/* 
function Search(container) {
    Component.call(this, container);
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Search.prototype.onSearch = function (expression) {
    var form = this.container.getElementsByTagName('form')[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = form.query.value;

        expression(query);
    });
}; */