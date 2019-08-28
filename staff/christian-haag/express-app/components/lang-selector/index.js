const { path } = require('./config')

module.exports = function (lang) {
    return `
    <ul class="lang-selector">
        <li class="lang-selector__li">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="en">
                <button class="lang-selector__li--button">EN</button>
            </form>
        </li>
        <li class="lang-selector__li">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="es">
                <button class="lang-selector__li--button">ES</button>
            </form>
        </li>
        <li class="lang-selector__li">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="ca">
                <button class="lang-selector__li--button">CA</button>
            </form>
        </li>
        <li class="lang-selector__li">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="de">
                <button class="lang-selector__li--button">DE</button>
            </form>
        </li>
        <li class="lang-selector__li">
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="kli">
                <button class="lang-selector__li--button">KLI</button>
            </form>
        </li>
    </ul>
    `
}