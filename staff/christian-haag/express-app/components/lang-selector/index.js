const { path } = require('./config')

module.exports = function (lang) {
    return `<ul>
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
                <input type="hidden" name="lang" value="de">
                <button>DE</button>
            </form>
        </li>
        <li>
            <form method="post" action="${path}">
                <input type="hidden" name="lang" value="kli">
                <button>KLI</button>
            </form>
        </li>
    </ul>`
}