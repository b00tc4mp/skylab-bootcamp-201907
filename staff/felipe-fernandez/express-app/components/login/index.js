const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

module.exports = function (lang, error) {
    const { signIn, goBack, password } = literals[lang]

    return `<h2>${signIn}</h2>
        <form class="form login" method="post" action="${path}">
            <label>E-mail<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password" /></label>
            <button>${signIn}</button>
            <a href="${goBackPath}">${goBack}</a>
        </form>
        ${error ? Feedback(error): ''}`
        
}