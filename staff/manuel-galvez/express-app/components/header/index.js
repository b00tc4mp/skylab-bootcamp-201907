const Search = require('../search')
const Locale = require('../locale')
const locale = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritesPath, homePath } = require('./config')

function Header(name, query, lang = 'en', error) {
    const { signIn, signUp, signOut, favorites } = locale[lang]
    return `<header>
        ${name && `<nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <h1 class="welcome">Hello, ${name}!</h1>
                        <li class="menu__option">
                            <form class="form" method="post" action="${signOutPath}">
                                <button class="menu__signout">${signOut}</button>
                            </form>
                        </li>
                        <li class="menu__option">
                            <a href="${favoritesPath}">${favorites}</a>
                        </li>
                        ${Locale()}
                    </ul>
                </div>
            </nav>
            <a href="${homePath}" class="logo">
                <div class="logo__img">
                    <img src="https://i.kym-cdn.com/photos/images/original/000/588/934/b54.jpg" />
                </div>
                <div class="logo__text">
                    <h3>SkyDucks</h3>
                </div>
            </a>`
            || 
            `<nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <li class="menu__option">
                            <a href="${signInPath}">${signIn}</a>
                        </li>
                        <li class="menu__option">
                            <a href="${signUpPath}">${signUp}</a>
                        </li>
                        ${Locale()}
                    </ul>
                </div>
            </nav>
           <a href="${homePath}" class="logo">
                <div class="logo__img">
                    <img src="https://i.kym-cdn.com/photos/images/original/000/588/934/b54.jpg" />
                </div>
                <div class="logo__text">
                    <h3>SkyDucks</h3>
                </div>
            </a>` 
        }
        ${Search(query, error)}
    </header>`
}

module.exports = Header

