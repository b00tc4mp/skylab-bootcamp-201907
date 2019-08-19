const FavButton = require('../fav-button')

module.exports = function ({ id, title, imageUrl, price, favorite }) {
    return `<a href="/ducks/${id}">
            <h3 class="ducks__title">${title}</h3>
            <img class="ducks__img" src="${imageUrl}">
            <p class="ducks__price">${price}</p>
            ${FavButton(id, favorite)}
        </a>`
}