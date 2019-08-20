const FavButton = require('../fav-button')

module.exports = function ({ id, title, imageUrl, price, favorite }) {
    return `<a href="/ducks/${id}">
            <h3>${title}</h3>
            <img src="${imageUrl}">
            <span>${price}</span>
            ${FavButton(id, favorite)}
        </a>`
}