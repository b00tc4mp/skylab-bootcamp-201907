const FavButton = require('./fav-button')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }) {
    return `<article class="list-item">
        <h3 class="list-item__header">${title}</h3>
        <img  class="list-item__image" src="${imageUrl}">
        <p class="list-item__description">${description}</p>
        ${FavButton(id, favorite)}
        <span class="list-item__price">${price}</span>
        <a class="btn" href="${link}" target="_blank">Go to store</a>
    </article>`
}

module.exports = DuckDetail