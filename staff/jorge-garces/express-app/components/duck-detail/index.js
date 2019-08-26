const FavButton = require('../fav-button')
const literals = require('./i18n')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }, lang) {
    const { toStore } = literals[lang]
    return `<article>
        <h3>${title}</h3>
        <img class='imagen' src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">${toStore}</a>
        ${FavButton(id, favorite)}
    </article>`
}

module.exports = DuckDetail