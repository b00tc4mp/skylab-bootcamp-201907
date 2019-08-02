/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckFavourites extends Results {
    constructor(container) {
        super(container)
    }

    paintItem = (li, duck) => {

        let h3 = document.createElement('h3');
        h3.innerText = duck.title
        li.appendChild(h3)

        let h4 = document.createElement('h4');
        h4.innerText = duck.id
        li.appendChild(h4)

        // li.addEventListener('click', (event) => {
        //     event.preventDefault()

        //     this.onClickItem(duck.id)
        // })
    }


}