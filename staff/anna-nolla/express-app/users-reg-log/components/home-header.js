function HomeHeader(content) {
    return `<header>
    <ul>
        <li><a href="/goToLanding">Log Out</a></li>
        <li><a href="/goToFav">Favorites</a></li>
    </ul>
    ${content}
    </header>`
}
module.exports = HomeHeader