const literals = require('./i18n')
const { path } = require('./config')

function RegisterSuccess(lang) {

    const { success , signIn }= literals[lang]
    return `<p>
        ${success} <a href="${path}">${signIn}</a>.
    </p>`
}

module.exports = RegisterSuccess
