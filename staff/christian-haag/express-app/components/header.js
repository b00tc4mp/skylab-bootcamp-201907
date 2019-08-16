const Search = require('./search')

function Header(name, query, searchPath, loginPath, registerPath, favoritePath, logoutPath) {
    return `<header> 
    ${name && `<nav>
        <ul>
            <li>
                <form method="POST" action="${logoutPath}">
                <button>Logout</button>
                <a href="${favoritePath}">Favorites</a>
                </form>
            </li>
        </ul>
    </nav>
    <h1>Hello, ${name}!</h1>` || `<nav>
        <ul>
            <li>
                <a href="${registerPath}">Register</a>
            </li>
            <li>
                <a href="${loginPath}">Login</a>
            </li>
        </ul>
    </nav>`}
    ${Search(query, searchPath)}
</header>`
}

module.exports = Header