const literals = require('./i18n')
const FavButton = require('../fav-button')
const { SEARCH } = require('../../constants')

module.exports = function ({ id, favorite, title, imageUrl, price, description, link }, lang, query) {
    const { toStore, back } = literals[lang]
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">${toStore}</a>
        ${FavButton(id, favorite)}
        <a href="${`${SEARCH}?q=${query}`}">${back}</a>
    </article>`
}