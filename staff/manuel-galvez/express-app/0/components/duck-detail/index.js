const FavButton = require('../fav-button')
const locale = require('./i18n')
const { searchPath } = require('./config')

function DuckDetail({ id, favorite, title, imageUrl, price, description, link }, lang, query) {
    const { store, goback } = locale[lang]
    let goBackPath
    query ? goBackPath = `/search?q=${query}` : goBackPath = '/favorites'
    
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">${store}</a>
        <a href="${goBackPath}">${goback}</a>
        ${FavButton(id, favorite)}
    </article>`
}

module.exports = DuckDetail