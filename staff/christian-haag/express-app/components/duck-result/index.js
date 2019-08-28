const FavButton = require('../fav-button')

function DuckResults(ducks) {

    return ducks.length === 1 ?

        `<p class="alert" >${ducks}</p>` :

        `<ul class="duck-container">${ducks.map(({ id, title, imageUrl, price, favorite }) =>
            `<li class="duck-container__list">
                <a class="duck-container__list-a" href="/ducks/${id}">
                <h3 class="duck-container__list-h3">${title}</h3>
                <img class="duck-container__list-img" src="${imageUrl}">
                </a>
                <div class="duck-container__list-bottom">
                <span class="duck-container__list-span">${price}</span>
                ${FavButton(favorite, id)}
                <div>
            </li>`).join('')}</ul>`
}

module.exports = DuckResults

