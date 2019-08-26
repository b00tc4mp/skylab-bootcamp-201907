const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritePath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorite } = literals[lang]

    return `<header class="header">
        ${LangSelector()}
        ${name && `<nav>
            
                <ul class="header__nav"><li class="header__item"><a class="header__link" href="${favoritePath}"><i class="fas fa-heart"></i> ${favorite}</a></li>
                <li class="header__item"><form class="header__form" method="post" action="${signOutPath}"><button class="header__logout" ><i class="fas fa-sign-out-alt"></i> ${signOut}</button></form></li></ul>
                
            </nav>
            <h1 class="header__message">${hello}, ${name}!</h1>` || `<nav>
                <ul class="header__nav">
                    <li class="header__item"><a class="header__link" href="${signUpPath}"><i class="fas fa-user-plus"></i> ${signUp}</a></li>
                    <li class="header__item"><a class="header__link" href="${signInPath}"><i class="fas fa-sign-in-alt"></i> ${signIn}</a></li>
                </ul>
            </nav>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header