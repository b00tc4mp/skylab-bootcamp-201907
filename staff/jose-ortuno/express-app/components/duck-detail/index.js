const literals = require('./i18n')
const FavButton = require('../fav-button')
const { SEARCH } = require('../../constants')

module.exports = function ({ id, favorite, title, imageUrl, price, description, link }, lang, query, view) {
    const { toStore, back } = literals[lang]
    return `<article class="duck-detail">
        <h3>${title}</h3>
        <img class="duck-detail__photo" src="${imageUrl}">
        <p>${description}</p>
        <span class="duck-detail__price">${price}</span>
        <a href="${link}" target="_blank">${toStore}</a>
        ${FavButton(id, favorite)}
        ${view === 'favorites' ? `<a class="back" href="${`${SEARCH}?q=${query}`}">${back}</a>` : ''}
    </article>`
}