const FavButton = require('../fav-button')
const literals = require('./i18n')
const { goBackPath } = require('./config')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }, lang) {
    const { goStore, goBack } = literals[lang]

    return `<article class="duck-detail">
        <h3 class="duck-detail__title">${title}</h3>
        <img class="duck-detail__photo" src="${imageUrl}">
        <span class="duck-detail__price">${price}</span>
        <p>${description}</p>
        ${FavButton(id, favorite)}
        <a class="duck-detail__link" href="${link}" target="_blank">${goStore}</a>
        <a class="duck-detail__back" href="${goBackPath}"><i class="far fa-arrow-alt-circle-left"></i> ${goBack}</a>
    </article>`
}

module.exports = DuckDetail