const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

module.exports = function (error, email, lang) {
    const { signIn, goBack, password } = literals[lang]

    return `<h1>${signIn}</h1>
        <form method="post" action="${path}">
            <label>E-mail<input type="email" name="email" value="${email ? email : ''}" /></label>
            <label>${password}<input type="password" name="password" /></label>
            <button>${signIn}</button>
        </form>
        ${error ? Feedback(error, 'error') : ''}
        <a href="${goBackPath}">${goBack}</a>`
}