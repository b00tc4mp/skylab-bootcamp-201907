const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut } = literals[lang]

    return `<header class="header">
        ${LangSelector()}
        ${name && `<nav>
                <ul><li><form method="post" action="${signOutPath}"><button>${signOut}</button></form></li></ul>
            </nav>
            <h1>${hello}, ${name}!</h1>` || `<nav>
                <ul>
                    <li><a href="${signUpPath}">${signUp}</a></li>
                    <li><a href="${signInPath}">${signIn}</a></li>
                </ul>
            </nav>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header