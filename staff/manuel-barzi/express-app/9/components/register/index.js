const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

function Register(error, name, surname, email, lang) {
    const { signUp, name: _name, surname: _surname, password, repassword, goBack } = literals[lang]

    return `<h1>${signUp}</h1>
        <form method="post" action="${path}">
            <label>${_name}<input type="text" name="name" value="${name ? name : ''}"/></label>
            <label>${_surname}<input type="text" name="surname" value="${surname ? surname : ''}" /></label>
            <label>E-mail<input type="email" name="email" value="${email ? email : ''}"/></label>
            <label>${password}<input type="password" name="password" /></label>
            <label>${repassword}<input type="password" name="repassword" /></label>
            <button>${signUp}</button>
        </form>
        ${error ? Feedback(error, 'error') : ''}
        <a href="${goBackPath}">${goBack}</a>`
}

module.exports = Register