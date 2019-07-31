/**
 * Duck Favourites abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckFavorite extends Results {
    constructor(container) {
        super(container)
    }

    /*displayDuck = (duck) => {
        let title = this.container.getElementsByTagName('h3')[0]
        title.innerText = duck.title

        let image = this.container.getElementsByTagName('img')[0]
        image.src = duck.imageUrl;

        let price = this.container.getElementsByTagName('span')[0]
        price.innerText = duck.price

        let description = this.container.getElementsByTagName('p')[0]
        description.innerText = duck.description

        let link = this.container.getElementsByTagName('a')[0]
        link.href = duck.link

    }*/

    onNavigateBack = (expression) => {
        let back = this.container.getElementsByTagName('a')[1]
    
        back.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }
}