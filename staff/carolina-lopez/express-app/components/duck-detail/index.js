const FavButton = require('../fav-button')
const literals = require('./i18n')
const { goBackPath } = require('./config')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }, lang) {
    const { goToLink, goBack } = literals[lang]

    return `<article class="duck-detail">
        <h3 class="duck-detail__title">${title}</h3>
        <img class="duck-detail__img" src="${imageUrl}">
        <span class="duck-detail__price">${price}</span>
        <p class='duck-detail__description'>${description}</p>
        ${FavButton(id, favorite)}
        <a href="${link}" target="_blank" class='btn'>${goToLink}</a>
        <a href="${goBackPath}" class='btn' >${goBack}</a>
    </article>`
}

module.exports = DuckDetail