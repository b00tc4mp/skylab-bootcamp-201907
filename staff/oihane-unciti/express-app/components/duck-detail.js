const FavButton = require('./fav-button')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }) {
    return `<article class="detail-duck">
        <h3 class="duck-item__title">${title}</h3>
        <img class="duck-item__image" src="${imageUrl}">
        <span class="duck-item__price">${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
        ${FavButton(id, favorite)}
    </article>`
}

module.exports = DuckDetail