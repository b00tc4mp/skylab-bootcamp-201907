const FavButton = require("./favbutton")

function DuckDetail({ title, imageUrl, price, description, link, favorite, id }) {
    const path = `/ducks/${id}`
    return `<article>
        <h3>${title}</h3>
        ${FavButton(favorite, id, path)}
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
    </article>`
}

module.exports = DuckDetail