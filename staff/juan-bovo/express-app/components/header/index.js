const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritePath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorite } = literals[lang]

    return `<header class="header">
        <article>
        ${LangSelector()}
        <h1 class="header__title">This is an Old Duck Shop</h1>
        ${name && `<nav>
                <ul>
                <li class="form__list-item"><a class="header__back-link" href="${favoritePath}">${favorite}</a></li>
                <li>
                <form method="post" action="${signOutPath}">
                <button class="header__button">${signOut}</button>
                </form>
                </li>
                </ul>
                
            </nav>
            <h2>${hello}, ${name}!<h2>` || `<nav>
                <ul>
                    <li class="form__list-item"><a class="header__back-link" href="${signUpPath}">${signUp}</a></li>
                    <li class="form__list-item"><a class="header__back-link" href="${signInPath}">${signIn}</a></li>
                </ul>
            </nav>`}
       
       </article>
       
        ${Search(query, lang)}
    </header>`
}

module.exports = Header