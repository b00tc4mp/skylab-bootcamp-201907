const Search = require('./search')

function Header(query, userName, view) {
    return `<header class= "header">
        ${userName ?
        `<nav>
            <ul class= "header__nav">
                <li class="header__item"><a href="/">Home</a></li>
                ${!view ? `<li class="header__item"><a href="/favorites">Favorites</a></li>`
                :
                ``}
                <li class="header__item"><form method="post" action="/logout"><button>Logout</button></form></li>
            </ul>
        </nav>
        <h1 class="header__title">Hello, ${userName}!<h1>`
        :
        `<nav>
            <ul class= "header__nav">
                <li class="header__item"><a href="/">Home</a></li>
                <li class="header__item"><a href="/login">Login</a></li>
                <li class="header__item"><a href="/register">Register</a></li>
        </nav>`}
        ${Search(query)}
    </header>`
}

module.exports = Header