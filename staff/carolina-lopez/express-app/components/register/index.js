const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

function Register(error, name, surname, email, lang) {
    const { signUp, name: _name, surname: _surname, email: _email, password, repassword, goBack } = literals[lang]

    return `<section class='form-section'>
        <h1>${signUp}</h1>
        <form method="post" action="${path}" class='form'>
            <label>${_name}<input type="text" name="name" class='input' value="${name ? name : ''}"/></label>
            <label>${_surname}<input type="text" name="surname" class='input' value="${surname ? surname : ''}"/></label>
            <label>${_email}<input type="email" name="email" class='input' value="${email ? email : ''}" /></label>
            <label>${password}<input type="password" name="password" class='input' /></label>
            <label>${repassword}<input type="password" name="repassword" class='input' /></label>
            <button class='btn'>${signUp}</button>
        </form>
        ${error ? Feedback(error, 'error') : ''}
        <a href="${goBackPath}" class='btn'>${goBack}</a>
        </section>`
}

module.exports = Register