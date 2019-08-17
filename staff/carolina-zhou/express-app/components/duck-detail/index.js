const FavButton = require('../fav-button')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }) {
    return `<article class="duck-detail">
        <h3 class="duck-detail__title">${title}</h3>
        <img class="duck-detail__photo" src="${imageUrl}">
        <span class="duck-detail__price">${price}</span>
        <p>${description}</p>
        ${FavButton(id, favorite)}
        <a class="duck-detail__link" href="${link}" target="_blank">Go to store</a>
    </article>`
}

module.exports = DuckDetail