function Search(query) {
    return `<form action="/search">
        <input type="text" name="q" value="${query || ''}">
        <button>Search</button>
    </form>`
}

module.exports = Search