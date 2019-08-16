const literals = require('./i18n')
const FavButton= require('../fav-button')

function DuckDetail({ lang, id, favorite, title, imageUrl, price, description, link, onBackPath }) {
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
        ${FavButton(id, favorite)}
    </article>
    <nav>
    <ul><li><form method="post" action="${onBackPath}"><button>${literals[lang].link}</button></form></li></ul>
    </nav>`
}

module.exports = DuckDetail