

function HomeHeader(userName) {
    return `<header>
    <h3> Hello, ${userName}</h3> 
    <ul>
        <li><a href="/goToLanding">Log Out</a></li>
        <li><a href="/goToFav">Favorites</a></li>
    </ul>

    </header>`
}
module.exports = HomeHeader