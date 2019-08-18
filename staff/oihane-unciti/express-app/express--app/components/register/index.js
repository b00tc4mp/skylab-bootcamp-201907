const literals = require('./i18n')
const { path, goBackPath } = require('./config')

function Register(lang) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<h1>${signUp}</h1>
        <form method="post" action="${path}">
            <label class="form__field">${name}<input class="form__field" type="text" name="name" /></label>
            <label class="form__field">${surname}<input class="form__field" type="text" name="surname" /></label>
            <label class="form__field">E-mail<input class="form__field" type="email" name="email" /></label>
            <label class="form__field">${password}<input class="form__field" type="password" name="password" /></label>
            <label class="form__field">${repassword}<input class="form__field" type="password" name="repassword" /></label>
            <button>${signUp}</button>
        </form>
        <a href="${goBackPath}">${goBack}</a>`
}

module.exports = Register