const literals = require('./i18n')
const Search = require('../search')
const LangSelector = require('../lang-selector')
const { FAVORITES, SIGN_OUT, SIGN_UP, SIGN_IN, SEARCH } = require('../../constants')

module.exports = function (name, query, lang) {
    const { favorites, signOut, signUp, signIn, hello } = literals[lang]
    return `<header>
        ${LangSelector()}
        ${name && `<nav>
                <ul>
                <li><form method="get" action="${FAVORITES}"><button>${favorites}</button></form></li>
                <li><form method="post" action="${SIGN_OUT}"><button>${signOut}</button></form></li>
                </ul>
            </nav>
            <h1>${hello}, ${name}!</h1>` || `<nav>
                <ul>
                    <li><a href="${SIGN_UP}">${signUp}</a></li>
                    <li><a href="${SIGN_IN}">${signIn}</a></li>
                </ul>
            </nav>`}
        ${Search(query, SEARCH, lang)}
    </header>`
}