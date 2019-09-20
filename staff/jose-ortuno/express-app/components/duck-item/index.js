const FavButton = require('../fav-button')
const { DETAIL } = require('../../constants')

module.exports = function ({ id, title, imageUrl, price, favorite }) {
    return `<a href="${DETAIL}/${id}">
            <h3>${title}</h3>
            <span>${price}</span>
            <img src="${imageUrl}">
            ${FavButton(id, favorite)}
        </a>`
}