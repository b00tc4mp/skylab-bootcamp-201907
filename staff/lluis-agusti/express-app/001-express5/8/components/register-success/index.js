const literals = require('./i18n')
const { path } = require('./config')

function RegisterSuccess(lang) {
    const { okmessage, login } = literals[lang]
    return `<p>
        ${okmessage}<a href="${path}">${login}</a>.
    </p>`
}

module.exports = RegisterSuccess