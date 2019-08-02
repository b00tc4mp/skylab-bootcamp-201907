/**
 * 
 * Ducks abstraction.
 * 
 * @param {*} container 
 */

class DuckResult extends Results {
    constructor(container) {
        super(container)
    }

    paintItem(li, item) {

        let h3 = document.createElement('h3');
        h3.innerText = item.title;
        li.appendChild(h3);

        let img = document.createElement('img');
        img.src = item.imageUrl
        li.appendChild(img)

        let p = document.createElement('p');
        p.className = 'list-price'
        p.innerText = item.price
        li.appendChild(p);

        li.addEventListener('click', event => {
            event.preventDefault();
            this.onClickItem(item.id);
        });
    };

    onClickItem(expression) {
        this.onClickItem = expression
    }
}
