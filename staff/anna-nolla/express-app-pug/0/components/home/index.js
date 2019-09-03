const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, selectLangPath, favoritePath } = require('./config')
const searchLiterals = require('../search/i18n')
const { path: searchPath } = require('../search/config')

function Header(name, query, lang, ducks, duck, res) {
    const { hello, signUp, signIn, signOut, favorite } = literals[lang]
    const { search } = searchLiterals[lang]

    res.render('home', {
        name,
        hello,
        signUp,
        signIn,
        signOut,
        favorite,
        signInPath,
        signUpPath,
        signOutPath,
        selectLangPath,
        search,
        searchPath,
        ducks,
        duck,
        favoritePath
    })
}

module.exports = Header