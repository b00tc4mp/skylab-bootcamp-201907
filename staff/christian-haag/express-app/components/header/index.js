const Search = require('../search')
const literals = require('./i18n')
const { registerPath, loginPath, favoritePath, logoutPath } = require('./config')
const LangSelector = require('../lang-selector')


function Header(name, query, lang) {
    const { hello, register, login, favorites, logout } = literals[lang]
    return `<header class="header"> 
    <h1 class="title" >Ducky Duk Store</h1>
    ${LangSelector()}
    ${name && `
    <nav>
        <ul class="header__nav-bar">
            <li class="header__li">
                <form method="POST" action="${logoutPath}">
                <button class="header__anchor-button">${logout}</button>
                </form>
            </li>
            <li class="header__li">
            <a class="header__anchor" href="${favoritePath}">${favorites}</a>
            </li>
        </ul>
    </nav>
    <h2 class="name" >${hello}, ${name}!</h2>` || `<nav>
        <ul class="header__nav-bar">
            <li class="header__li">
                <a class="header__anchor" href="${registerPath}">${register}</a>
            </li>
            <li>
                <a class="header__anchor" href="${loginPath}">${login}</a>
            </li>
        </ul>
    </nav>`}
    ${Search(lang, query)}
</header>`
}

module.exports = Header