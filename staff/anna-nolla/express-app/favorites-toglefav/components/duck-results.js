const FavButton = require("./favbutton")

function DuckResults(ducks) {
    const path = "/search"
    return `<ul>${ducks.map(({ id, title, imageUrl, price, favorite }) => `<li>
        <a href="/ducks/${id}">
            <h3>${title}</h3>
            <img src="${imageUrl}">
            <span>${price}</span>
        </a>
        ${FavButton(favorite, id, path)}
    </li>`).join('')}</ul>`
}

module.exports = DuckResults