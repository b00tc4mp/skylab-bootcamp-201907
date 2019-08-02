/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckDetail extends Component{
    constructor(container){
        super(container)
    }

    displayDuck(duck, addDuckToFavourites){
        var title = this.container.getElementsByTagName('h3')[0];
        title.innerText = duck.title;

        var image = this.container.getElementsByTagName('img')[0];
        image.src = duck.imageUrl;

        var price = this.container.getElementsByTagName('span')[0];
        price.innerText = duck.price;

        var description = this.container.getElementsByTagName('p')[1];
        description.innerText = duck.description;

        var link = this.container.getElementsByTagName('a')[0];
        link.href = duck.link;

        var favourite = this.container.getElementsByClassName('favourite')[0];
     
        favourite.addEventListener('click', function (event) {
            addDuckToFavourites(duck)
        });
    }
    onNavigateBack = expression => {
        const back = this.container.getElementsByTagName('button')[0] // HTML fer selectr by classname
    
        back.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }

}
 