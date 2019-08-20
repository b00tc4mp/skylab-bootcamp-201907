const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favorites } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut } = literals[lang]

    return `<header class="header">
    <div class="cab">
            ${name && `<nav class="nav--pos">
                <ul>
                <li><a href=${favorites}>Favorites</a></li>
                <li><form method="post" action="${signOutPath}"><button>${signOut}</button></form></li>
                </ul>
            </nav>
            <h1>${hello}, ${name}!</h1>` || `<nav class="nav--pos">
                <ul>
                    <li><a href="${signUpPath}">${signUp}</a></li>
                    <li><a href="${signInPath}">${signIn}</a></li>
                </ul>
            </nav>`}
            <div class="lang--pos">${LangSelector()}</div>

        </div>
    </div>
        <div class="search">${Search(query, lang)}</div>
    </header>`
}

module.exports = Header