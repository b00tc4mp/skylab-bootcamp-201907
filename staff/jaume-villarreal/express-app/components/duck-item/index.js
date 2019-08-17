const FavButton = require('../fav-button')

module.exports = function ({ id, title, imageUrl, price, favorite }) {
    return `<article>
                <a class="list-item" href="/ducks/${id}">
                    <h3 class="list-item__header">${title}</h3>
                    <img class="list-item__img" src="${imageUrl}">
                    <span class="list-item__price">${price}</span>
                    ${FavButton(id, favorite)}
                </a>
            <article>`
}