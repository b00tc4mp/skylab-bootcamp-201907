const FavButton = require('./fav-button')


function DuckDetail({ title, imageUrl, price, description, link ,id }) {
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        ${FavButton(true, id)}
        <a href="${link}" target="_blank">Go to store</a>
    </article>`
}

module.exports = DuckDetail