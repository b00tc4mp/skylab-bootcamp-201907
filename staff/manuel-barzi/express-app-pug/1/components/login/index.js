const literals = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function (error, emailValue, lang, res) {
    const { signIn, goBack, password } = literals[lang]

    res.render('login', { error, signIn, goBack, password, path, goBackPath, emailValue })
}