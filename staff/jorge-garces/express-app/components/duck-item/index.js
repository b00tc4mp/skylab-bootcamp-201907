const FavButton = require('../fav-button')

module.exports = function ({ id, title, imageUrl, price, favorite }) {
    return `<a href="/ducks/${id}">
            <h3>${title} ${FavButton(id, favorite)}</h3>
            <img src="${imageUrl}" class='imagen'>
            <p>${price}</p>
            
        </a>`
}