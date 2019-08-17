const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritesPath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorites } = literals[lang]

    return `<header class="header">
                <h1 class="header__title">EXPRESS-DUCK</h1>
                <div class="header__lang">
                    ${LangSelector()}
                </div>
                
                ${name && `<nav class= "header__nav">
                        <ul class="header__nav--logged">
                            <li><form class="form__logged" method="post" action="${signOutPath}"><button class="btn btn--logged">${signOut}</button></form></li>
                            <li><form class="form__logged" method="post" action="${favoritesPath}"><button class="btn btn--logged">${favorites}</button></form></li>
                        </ul>
                    </nav>
                    <h1 class="header__title--username">${hello}, ${name}!<h1>` || `<nav class="header__nav">
                        <ul>
                            <li><a class="btn" href="${signUpPath}">${signUp}</a></li>
                            <li><a class="btn" href="${signInPath}">${signIn}</a></li>
                        </ul>
                    </nav>`}
                
                <div class="header__search">
                    ${Search(query, lang)}
                </div>
                
            </header>`
}

module.exports = Header