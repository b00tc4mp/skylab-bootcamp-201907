const literals = require('./i18n')
const Search = require('../search')
const LangSelector = require('../lang-selector')
const { FAVORITES, SIGN_OUT, SIGN_UP, SIGN_IN, SEARCH } = require('../../constants')

module.exports = function (name, query, lang) {
    const { favorites, signOut, signUp, signIn, hello } = literals[lang]
    return `<header>
    <section class="top" >
        <h1 class="logo">Express App</h1>
        <a href="#main-menu"
            id="main-menu-toggle"
            class="menu-toggle"
            aria-label="Open main menu">
            <span class="sr-only">Open main menu</span>
            <span class="fa fa-bars" aria-hidden="true"></span>
        </a>
        <nav id="main-menu" class="main-menu" aria-label="Main menu">
        <a href="#main-menu-toggle"
            id="main-menu-close"
            class="menu-close"
            aria-label="Close main menu">
            <span class="sr-only">Close main menu</span>
            <span class="fa fa-close" aria-hidden="true"></span>
        </a>
        ${LangSelector()}
        ${name ?
                `<ul class="user" >
                    <li><form method="get" action="${FAVORITES}"><button>${favorites}</button></form></li>
                    <li><form method="post" action="${SIGN_OUT}"><button>${signOut}</button></form></li>
                </ul>
            </nav>
            <div class="hello">
                <h2>${hello}, ${name}!</h2>
            </div>`
        :
                `<ul class="user">
                    <li><a href="${SIGN_UP}">${signUp}</a></li>
                    <li><a href="${SIGN_IN}">${signIn}</a></li>
                </ul>
            </nav>`}
            <a href="#main-menu-toggle"
            class="backdrop"
            tabindex="-1"
            aria-hidden="true" hidden></a>
        </section>
        ${Search(query, SEARCH, lang)}
    </header>`
}