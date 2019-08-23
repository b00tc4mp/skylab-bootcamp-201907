const FavButton = require('../fav-button')
const literals = require('./i18n')

function Favorites(lang, ducks, gobackPath) {
    const { seccionTitle } = literals[lang]

    return `
        <h2 class="panel-title" >${seccionTitle}</h2>
        <ul class="duck-container">${ducks.map(({ title, imageUrl, price, favorite, id }) => ` <li class="duck-container__fav">
            <h3 class="duck-container__fav-h3">${title}</h3>
            <img class="duck-container__fav-image" src=${imageUrl} />
            <p class="duck-container__fav-price">${price}</p>
            ${FavButton(favorite, id)}
            </li>`).join('')}</ul>
        <a href="${gobackPath}">Go back</a>`
}

module.exports = Favorites