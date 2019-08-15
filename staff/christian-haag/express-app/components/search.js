function Search(query, name) {
    return `<div>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    </div>
    <form action="/search">
<input type="text" name="q" value="${query || ''}"">
<button>Search</button>
</form>`
}

module.exports = Search