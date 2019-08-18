const Search = require('../search')
const Locale = require('../locale')
const locale = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritesPath } = require('./config')

function Header(name, query, lang = 'en') {
    const { signIn, signUp, signOut, favorites } = locale[lang]
    return `<header>
        ${Locale()}
        ${name && `<nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <li>
                            <form class="search__form form" method="post" action="${signOutPath}">
                                <button class="logout__btn btn btn--secondary">${signOut}</button>
                            </form>
                        </li>
                        <li>
                            <a href="${favoritesPath}">${favorites}</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <h1>Hello, ${name}!<h1>` 
            || 
            `<nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <li>
                            <a class="login__btn btn btn--primary" href="${signInPath}">${signIn}</a>
                        </li>
                        <li>
                            <a class="login__btn btn btn--secondary" href="${signUpPath}">${signUp}</a>
                        </li>
                    </ul>
                </div>
            </nav>`}
        ${Search(query, lang)}
    </header>`
}

module.exports = Header

