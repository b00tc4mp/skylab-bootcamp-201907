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

        const fav = document.createElement('button')
        fav.innerText = 'Add to Fav'

        li.appendChild(fav)

        img.addEventListener('click', event => {
            event.preventDefault()

            this.onClickItem(duck.id)
        })

        fav.addEventListener('click', event => {
            event.preventDefault()

            this.onAddItem(duck.id)
        })

    }
    onClickItem(id){
        console.log(id)
    }
    onAddItem(id){
        console.log(id)
    }

    }

