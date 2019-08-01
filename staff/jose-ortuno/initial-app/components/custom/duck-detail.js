class DuckDetail extends Component {
    constructor(container) {
        super(container)
    }

    displayDuck = duck => {
        const title = this.container.getElementsByTagName('h3')[0]
        title.innerText = duck.title

        const image = this.container.getElementsByTagName('img')[0]
        image.src = duck.imageUrl

        const price = this.container.getElementsByTagName('span')[0]
        price.innerText = duck.price

        const description = this.container.getElementsByTagName('p')[0]
        description.innerText = duck.description

        const link = this.container.getElementsByTagName('a')[0]
        link.href = duck.link

        const addFav = this.container.getElementsByTagName('a')[2]
        addFav.dataset.value = duck.id
    }

    onNavigateBack = expression => {
        const back = this.container.getElementsByTagName('a')[1]
    
        back.addEventListener('click', event => {
            event.preventDefault()
            expression()
        })
    }

    addFav = expression => {
        const addFav = this.container.getElementsByTagName('a')[2]
        addFav.addEventListener('click', event => {
            event.preventDefault()

            expression(addFav.dataset.value)
        })
    }
}




// /**
//  * Duck Detail abstraction.
//  * 
//  * @param {HTMLElement} container 
//  */
// function DuckDetail(container) {
//     Component.call(this, container);
// }

// DuckDetail.prototype = Object.create(Component.prototype);
// DuckDetail.prototype.constructor = DuckDetail;

// DuckDetail.prototype.displayDuck = function(duck) {
//     var title = this.container.getElementsByTagName('h3')[0];
//     title.innerText = duck.title;

//     var image = this.container.getElementsByTagName('img')[0];
//     image.src = duck.imageUrl;

//     var price = this.container.getElementsByTagName('span')[0];
//     price.innerText = duck.price;

//     var description = this.container.getElementsByTagName('p')[0];
//     description.innerText = duck.description;

//     var link = this.container.getElementsByTagName('a')[0];
//     link.href = duck.link;
// };