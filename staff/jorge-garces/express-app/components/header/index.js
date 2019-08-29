const Search = require('../search')
const literals = require('./i18n')
const { path } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, searchPath, signInPath, signUpPath, signOutPath, view, lang) {

    const { favus, exit, greet, register, signin } = literals[lang]

    return `<header>
    <section class='landing'>
    <section class='wrapper'>
        ${LangSelector()}
        </section>

        <div class='logoGreet'>
            <img src="./ducklogo.png"></img>
            <h1>Express Ducks</h1>
        </div>

        ${name && `<nav class='options'>
                <ul class='reg_log'>
                <li><form method="get" action="${path}"><button>${favus}</button></form></li>
                <li><form method="post" action="${signOutPath}"><button>${exit}</button></form></li>
                </ul>
            </nav>
            <h1>${greet}, ${name}!</h1>` || `<nav class='options'>
                <ul class='reg_log'>
                    <li><a href="${signUpPath}">${register}</a></li>
                    <li><a href="${signInPath}">${signin}</a></li>
                </ul>
            </nav>`}    

        <div class='search_wrapper'>
            ${Search(query, searchPath, lang)}
        </div>
        </section>
        
    </header>`
}

module.exports = Header