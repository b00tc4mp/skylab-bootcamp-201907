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
        img.addEventListener('click', event => {
            event.preventDefault();

            this.onClickItem(id);
        });

        const button = document.createElement('button')
        button.innerText = 'add to Favorites';

        li.appendChild(button);

        li.className = "duck-results__item";
        img.className = "duck-results__image";
        button.className = "duck-results__favorites";
    }

    onClickItem(id) {
        console.log(id);
    }

    addToFavorites(expression) {
        const favorites = document.getElementsByClassName('duck-results__favorites');

        for(let i = 0; i < favorites.length; i++) {
            let favorite = favorites[i];

            favorite.addEventListener('click', event => {
                event.preventDefault();
    
                favorite.innerText = 'my Favorite!';
                expression();
            });
        }
    }
}