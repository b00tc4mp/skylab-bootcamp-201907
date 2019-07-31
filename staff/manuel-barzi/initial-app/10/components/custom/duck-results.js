'use strict'

/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckResults extends Results {
    constructor(container) {
        super(container)
    }

    paintItem(li, duck) {
        const h3 = document.createElement('h3')

        h3.innerText = duck.title

        li.appendChild(h3)

        const img = document.createElement('img')
        img.src = duck.imageUrl

        li.appendChild(img)

        const favorite = document.createElement('button')
        favorite.innerText = 'Add to Favorite'
        favorite.addEventListener('click', event => {
            event.stopPropagation()
            
            this.onAddToFavoriteClicked(duck.id)
        }, false)

        li.appendChild(favorite)

        li.addEventListener('click', event => {
            event.preventDefault()

            this.onClickItem(duck.id)
        })
    }

    onClickItem(id) {
        console.log(id)
    }

    onAddToFavoriteClicked(id) {
        console.log(id)
    }
}
