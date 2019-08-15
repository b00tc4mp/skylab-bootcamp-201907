function Header(content) {
    return `<header>
    <ul>
    <li><a href="">Home</a></li>
    <li><a href="">Register</a></li>
    <li><a href="">Login</a></li>
    <li><a href="">FavoritesIfLogged</a></li>
    </ul
        ${content}
    </header>`
}

module.exports = Header