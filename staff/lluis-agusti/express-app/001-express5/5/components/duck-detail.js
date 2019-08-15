function DuckDetail({ title, imageUrl, price, description, link }) {
    return `<article>
        <h3>${title}</h3>
        <img src="${imageUrl}">
        <span>${price}</span>
        <p>${description}</p>
        <a href="${link}" target="_blank">Go to store</a>
        <a onclick="toggleFavDuck()">Toggle Fav</a>
        <script> function toggleFavDuck(id, token, duckId) {active ? '💜' : '💔'} </script>
    </article>`
}

module.exports = DuckDetail