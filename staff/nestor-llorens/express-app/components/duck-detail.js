const FavButton = require('./fav-button')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }, back) {
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
        ${FavButton(id, favorite)}
        <a href="${back}">Go back</a>
    </article>`
}

module.exports = DuckDetail