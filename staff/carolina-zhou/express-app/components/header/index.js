const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritePath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorite } = literals[lang]

    return `<header class="header">
        ${LangSelector()}
        ${name && `<nav>
            
                <ul class="header__nav"><li><a class="header__link" href="${favoritePath}">${favorite}</a></li>
                <li><form method="post" action="${signOutPath}"><button class="header__button">${signOut}</button></form></li></ul>
                
            </nav>
            <h1 class="header__link">${hello}, ${name}!</h1>` || `<nav>
                <ul class="header__nav">
                    <li><a class="header__link" href="${signUpPath}">${signUp}</a></li>
                    <li><a class="header__link" href="${signInPath}">${signIn}</a></li>
                </ul>
            </nav>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header