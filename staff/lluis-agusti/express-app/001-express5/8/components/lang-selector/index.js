// const literals = require('./i18n')
const { path } = require('./config')

function LangSelector(path) {

    return `<form method="post" action="${path}">
            <select>
            <option value="english">English</option>
            <option value="espanol">Español</option>
            <option value="catala">Català</option>
            <option value="francais">Français</option>
            </select>
            <button>Ok</button>
        </form>`
}

module.exports = LangSelector