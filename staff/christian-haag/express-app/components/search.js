function Search(query, registerPath, loginPath) {
    return `<div>
    <a href="${registerPath}">Register</a>
    <a href="${loginPath}">Login</a>
    </div>
    <form action="/search">
<input type="text" name="q" value="${query || ''}"">
<button>Search</button>
</form>`
}

module.exports = Search