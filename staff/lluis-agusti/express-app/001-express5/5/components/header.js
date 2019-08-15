function Header(content) {
    return `<button onclick="goBack()">Go Back</button>
    <script> function goBack() { window.history.back(); } </script><header>
    <ul style="list-style-type: none; display: inline;">
    <li style="display: inline;"><a href="/">Home</a></li>
    <li style="display: inline;"><a href="/sign-up">Register</a></li>
    <li style="display: inline;"><a href="/sign-in">Login</a></li>
    <li style="display: inline;"><a href="/favs">FavoritesIfLogged</a></li>
    </ul
        ${content}
    </header>`
}

module.exports = Header