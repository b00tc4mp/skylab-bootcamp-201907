function Search(query, path) {
    return `<form action="${path}">
        <input type="text" name="q" value="${query || ''}">
        <button>Search</button>
    </form>`
}

module.exports = Search