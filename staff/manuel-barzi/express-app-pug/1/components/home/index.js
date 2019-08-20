const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, selectLangPath } = require('./config')
const searchLiterals = require('../search/i18n')
const { path: searchPath } = require('../search/config')

function Header(name, query, lang, ducks, res) {
    const { hello, signUp, signIn, signOut } = literals[lang]
    const { search } = searchLiterals[lang]

    res.render('home', { name, hello, signUp, signIn, signOut, signInPath, signUpPath, signOutPath, selectLangPath, search, searchPath, ducks })
}

module.exports = Header