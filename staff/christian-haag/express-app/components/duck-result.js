function DuckResults(ducks) {
    return `<ul>${ducks.map(({ id, title, imageUrl, price }) =>
        `<li><a href="/ducks/${id}">
    <h2>${title}</h2>
    <img src=${imageUrl} />
    <p>${price}</p>
    </a>
    </li>`).join('')}</ul>`
}

module.exports = DuckResults