const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritesPath  } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorites } = literals[lang]

    return `<header class="header">
    <div class="navigator">   
     ${LangSelector()}
        ${name && `       
           
                <nav class="header__sign">
                    <ul>
                    <li><form method="post" action="${signOutPath}"><button>${signOut}</button>
                    <a href="${favoritesPath}">${favorites}</a>
                    </form>
                    </li>
                    </ul>
                    
                </nav>
              
            </div>
            <h1>${hello}, ${name}!</h1>
            ` || `
                <nav class="header__sign"> 
                    <ul>
                        <li><a href="${signUpPath}">${signUp}</a></li>
                        <li><a href="${signInPath}">${signIn}</a></li>
                    </ul>
                </nav>
                </div>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header