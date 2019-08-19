const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, goHomePath, favDucksPath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, goHome, goFavorites, languages} = literals[lang]

    return `<header class="header">
        <div class= "header--title">
        <a class="logo" href="${goHomePath}">${goHome}</a>
        </div>
        <div class= "header--items">
        <div class= "dropdown">
        <button href="" class="dropbtn">${languages}</button>
        ${LangSelector()}
        </div>
        <div class= "header--search">
        ${Search(query, lang)}
        </div>        
        ${name && `<nav class="sign">
        <ul>
        <li>
        <a href="${favDucksPath}">${goFavorites}</a>
        </li>
        <li>
        <form method="post" action="${signOutPath}">
        <buttonclass="button" >${signOut}</button>
        </form>
        </li>
        </ul>
    </nav>
            <h1 class="hello" >${hello}, ${name}!</h1>` || `<nav class="sign">
                <ul>
                    <li><a href="${signUpPath}">${signUp}</a></li>
                    <li><a href="${signInPath}">${signIn}</a></li>
                </ul>
            </nav>`}
            </div>


        
    </header>`
}

module.exports = Header