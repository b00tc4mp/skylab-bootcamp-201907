const Search = require('../search')
const Locale = require('../locale')
const locale = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritesPath } = require('./config')

function Header(name, query, lang = 'en') {
    const { signIn, signUp, signOut, favorites } = locale[lang]
    return `<header>
        ${Locale()}
        ${name && `<nav>
                <ul><li><form method="post" action="${signOutPath}"><button>${signOut}</button></form></li></ul>
                <li><a href="${favoritesPath}">${favorites}</a></li>
            </nav>
            <h1>Hello, ${name}!<h1>` || `<nav>
                <ul>
                    <li><a href="${signInPath}">${signIn}</a></li>
                    <li><a href="${signUpPath}">${signUp}</a></li>
                </ul>
            </nav>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header