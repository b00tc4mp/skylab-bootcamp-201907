/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckResults extends Results {
    constructor(container) {
        super(container)
    }
    paintItem = (li, duck) => {
        let h3 = document.createElement('h3')

        h3.innerText = duck.title

        li.appendChild(h3)

        let img = document.createElement('img')
        img.src = duck.imageUrl

        li.appendChild(img)

        const button = document.createElement('button')
        button.innerText= 'Add to favorite'

        li.addEventListener('click', event => {
            event.preventDefault();

            this.onClickItem(duck.id)

        })
    }
    onClickItem = id => {
        console.log(id)
    }
}