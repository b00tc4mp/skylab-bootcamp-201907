const FavButton = require('../fav-button')

module.exports = function ({ id, title, imageUrl, price, favorite }) {
    return `<a  class="duck-item" href="/duck-detail/${id}">
            <h3 class="duck-item__title">${title}</h3>
            <img class="duck-item__image" src="${imageUrl}">
            <span class="duck-item__price">${price}</span>
            ${FavButton(id, favorite)}
            </a>`
}