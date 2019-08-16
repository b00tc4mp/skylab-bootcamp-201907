function DuckDetail({ title, imageUrl, price, description, link, onBackPath }) {
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
    </article>
    <nav>
    <ul><li><form method="post" action="${onBackPath}"><button>Go back</button></form></li></ul>
    </nav>`
}

module.exports = DuckDetail