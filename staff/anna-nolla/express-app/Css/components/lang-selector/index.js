const { path } = require('./config')

module.exports = function (lang) {
    return `<ul class="header__lang-selector">
        <li class="header__lang-option">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="en">
                <button class="header__lang-button">🇺🇸</button>
            </form>
        </li>
        <li class="header__lang-option">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="es">
                <button class="header__lang-button">🇪🇦</button>
            </form>
        </li>
        <li class="header__lang-option ">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="ca">
                <button class="header__lang-button">🇦🇩</button>
            </form>
        </li>
        <li class="header__lang-option">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="fr">
                <button class="header__lang-button">🇹🇫</button>
            </form>
        </li>
    </ul>`
}