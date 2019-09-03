const { path } = require('./config')

module.exports = function (lang) {
    return `<ul class="lang-selector">
        <li>
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="en">
                <button>EN</button>
            </form>
        </li>
        <li>
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="es">
                <button>ES</button>
            </form>
        </li>
        <li>
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="ca">
                <button>CA</button>
            </form>
        </li>
        <li>
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="fr">
                <button>FR</button>
            </form>
        </li>
    </ul>`
}