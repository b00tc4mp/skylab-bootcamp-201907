const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

module.exports = function(error, email, lang) {
    const { signIn, email: _email, password, goBack } = literals[lang]
    return `<section class='form-section'>
        <h1>${signIn}</h1>
        <form method="post" action="${path}" class='form'>
            <label>${_email}<input type="email" name="email" class='input' value="${email ? email : ''}" /></label>
            <label>${password}<input type="password" name="password" class='input' /></label>
            <button class='btn'>${signIn}</button>
        </form>
        ${error ? Feedback(error, 'error'): ''}
        <a href="${goBackPath}" class='btn'>${goBack}</a>
        </section>`
}