function Search(query) {
    return `<form action="/search">
        <input type="text" name="q" value="${query || ''}">
        <button>Search</button>

        <p>Do you have an account? Then go to <a href="/sign-in">login</a></p>
        <p>Need an account? <a href="/sign-up">Sign up</a> for a new account!</p>
    </form>`
}

module.exports = Search