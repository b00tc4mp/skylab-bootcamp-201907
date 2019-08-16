const Search = require('../search')

function Header(name, query, searchPath, signInPath, signUpPath, signOutPath) {

    const { hello, signup, signin } = literals[lang]
    return `<header>
        ${name && `<nav>
                <ul><li><form method="post" action="${signOutPath}"><button>Sign-Out</button></form></li></ul>
            </nav>
            <h1>${hello}, ${name}!<h1>` || `<nav>
                <ul>
                    <li><a href="${signUpPath}">${signup}</a></li>
                    <li><a href="${signInPath}">${signin}</a></li>
                </ul>
            </nav>`}
        ${Search(query, searchPath)}
    </header>`
}

module.exports = Header