'use strict'

/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckDetail extends Component {
    constructor(container){
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
    }

    onClickBack = expression => {
        const back = document.getElementsByClassName('detail__back')[0]
    
        back.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }
}





