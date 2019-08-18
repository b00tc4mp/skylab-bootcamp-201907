const Search = require('../search')
const literals = require('./i18n')
const { registerPath, loginPath, favoritePath, logoutPath } = require('./config')
const LangSelector = require('../lang-selector')


function Header(name, query, lang) {
    const { hello, register, login, favorites, logout } = literals[lang]
    return `<header class="header"> 
    ${LangSelector()}
    ${name && `<nav class="header__nav-bar">
        <ul>
            <li>
                <form method="POST" action="${logoutPath}">
                <button>${logout}</button>
                <a href="${favoritePath}">${favorites}</a>
                </form>
            </li>
        </ul>
    </nav>
    <h1>${hello}, ${name}!</h1>` || `<nav>
        <ul>
            <li>
                <a href="${registerPath}">${register}</a>
            </li>
            <li>
                <a href="${loginPath}">${login}</a>
            </li>
        </ul>
    </nav>`}
    ${Search(lang, query)}
</header>`
}

module.exports = Header