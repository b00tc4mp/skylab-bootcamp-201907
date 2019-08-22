const { path } = require('./config')

module.exports = function (lang) {
    return `<ul class="lang-selector">
        <li class="lang-selector__button-frame">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="en">
                <button class="lang-selector__button">EN</button>
            </form>
        </li>
        <li class="lang-selector__button-frame">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="es">
                <button class="lang-selector__button">ES</button>
            </form>
        </li>
        <li class="lang-selector__button-frame">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="ca">
                <button class="lang-selector__button">CA</button>
            </form>
        </li>
        <li class="lang-selector__button-frame">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="fr">
                <button class="lang-selector__button">FR</button>
            </form>
        </li>
    </ul>`
}