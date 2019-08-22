function Search(query) {
    return `<form class="header__search" action="/search">
        <input type="text" name="q" value="${query || ''}">
        <button>Search</button>
    </form>`
}

module.exports = Search