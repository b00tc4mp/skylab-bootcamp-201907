/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckResults extends Results {
    constructor(container) {
        super(container);
    }

    paintItem(li, {title, imageUrl, id}) {
        const h3 = document.createElement('h3');

        h3.innerText = title;

        li.appendChild(h3);

        const img = document.createElement('img');
        img.src = imageUrl;

        li.appendChild(img);

        li.addEventListener('click', event => {
            event.preventDefault();

            this.onClickItem(id);
        });

        li.className = "duck-results__item";
        img.className = "duck-results__image";
    }

    onClickItem(id) {
        console.log(id);
    }
}