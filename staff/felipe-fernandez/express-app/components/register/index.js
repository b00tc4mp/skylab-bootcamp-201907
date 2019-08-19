const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

function Register(lang, error) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<h2>${signUp}</h2>
        <form class="form register" method="post" action="${path}">
            <label>${name}<input type="text" name="name" /></label>
            <label>${surname}<input type="text" name="surname" /></label>
            <label>E-mail<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password" /></label>
            <label>${repassword}<input type="password" name="repassword" /></label>
            <button>${signUp}</button>
            <a href="${goBackPath}">${goBack}</a>
        </form>    
        ${error ? Feedback(error): ''}`
}

module.exports = Register



