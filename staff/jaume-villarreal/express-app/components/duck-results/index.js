const FavButton = require('../fav-button')

module.exports = function(ducks) {
    return `<ul>${ducks.map(({ id, title, imageUrl, price }) => `<li>
        <a href="/ducks/${id}">
            <h3>${title}</h3>
            <img src="${imageUrl}">
            <span>${price}</span>
            ${FavButton()}
        </a>
    </li>`).join('')}</ul>`
}