const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath } = require('./config')

function Header(name, query, searchPath, signInPath, signUpPath, signOutPath,favorites,lang) {
    debugger
    const { hello, signIn, signUp, signOut } = literals[lang]

    
    return `<header>
    <h1 class="title">DUCK SERVER</h1>
            
            
        ${name && `
                
                <div class="uppernav">
                <nav>
                <ul>
                <li><form method="post" action="${signOutPath}"><button>${signOut}</button></form></li>
                <li><a href="${favorites}">Favorites</a></li>
                </ul>
                </nav>
                </div>
                <h1>${hello}, ${name}!</h1>` || `
            <div class="uppernav">
                <div>
                
                <ul>
                    <li><a href="${signUpPath}">${signUp}</a></li>
                    <li><a href="${signInPath}">${signIn}</a></li>
                </ul>
                </div>
                 
                <div class="container">
                <form  action="/">
                    <select name='lang'>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="ca">Català</option>
                    <option value="fr">Français</option>
                        </select>
                <button class="btn">Submit</button>
                </form>
                </div>
                
            </div>`}
        ${Search(query, searchPath)}
    </header>`
}

module.exports = Header 