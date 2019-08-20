const literals = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function (error, nameValue, surnameValue, emailValue, lang, res) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    res.render('register', { error, signUp, name, surname, password, repassword, goBack, path, goBackPath, nameValue, surnameValue, emailValue })
}