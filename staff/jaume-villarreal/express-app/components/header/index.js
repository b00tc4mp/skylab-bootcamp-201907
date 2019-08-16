const Search = require('../search')
const literals = require('./i18n')
const { searchPath, signInPath, signUpPath, signOutPath } = require("./config")

function Header(name, query, lang) {
    return `<header>
        ${name && `<nav>
                <ul><li><form method="post" action="${signOutPath}"><button>${literals[lang].signOut}</button></form></li></ul>
            </nav>
            <h1>Hello, ${name}!<h1>` || `<nav>
                <ul>
                    <li><a href="${signUpPath}">${literals[lang].signUp}</a></li>
                    <li><a href="${signInPath}">${literals[lang].signIn}</a></li>
                </ul>
            </nav>`}
        ${Search(query, searchPath)}
    </header>`
}

module.exports = Header