const Search = require('./search')

debugger

function Header(name, query, searchPath, signInPath, signUpPath, signOutPath) {
    return `<header>
        ${name && `<nav>
                <ul><li><form method="post" action="${signOutPath}"><button>Sign-Out</button></form></li></ul>
            </nav>
            <h1>Hello, ${name}!<h1>` || `<nav>
                <ul>
                    <li><a href="${signUpPath}">Sign-Up</a></li>
                    <li><a href="${signInPath}">Sign-In</a></li>
                </ul>
            </nav>`}
        ${Search(query, searchPath)}
    </header>`
}

module.exports = Header