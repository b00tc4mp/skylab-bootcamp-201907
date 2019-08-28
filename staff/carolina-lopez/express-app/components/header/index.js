const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritePath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorite} = literals[lang] 

    return `<header class="header">
        ${LangSelector()}
        ${name && `<nav class='nav'>
                <ul class='ul nav-ul'><li class='nav-li'><a href="${favoritePath}" class='button'>${favorite}</a></li>
                <li class='nav-li'><form method="post" action="${signOutPath}"><button class='button'>${signOut}</button></form></li></ul>
            </nav>
            <h1 class='hello'>${hello}, ${name}!</h1>` || `<nav class='nav'>
                <ul class='ul nav-ul'>
                    <li class='nav-li'><a href="${signUpPath}" class='button'>${signUp}</a></li>
                    <li class='nav-li'><a href="${signInPath}" class='button'>${signIn}</a></li>
                </ul>
            </nav>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header