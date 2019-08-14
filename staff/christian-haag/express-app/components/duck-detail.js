function DuckDetail({ title, imageUrl, price, description, link }) {
    return `<article>
    <h2>${title}</h2>
    <img src=${imageUrl} />
    <p>${price}</p>
    <p>${description}</p>
    <a href="${link} target='blank> Go to Store</a>
    </article>`
}

module.exports = DuckDetail