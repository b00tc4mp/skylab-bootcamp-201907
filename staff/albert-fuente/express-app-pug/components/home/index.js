const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, selectLangPath, favoritePath } = require('./config')
const searchLiterals = require('../search/i18n')
const { path: searchPath } = require('../search/config')
const { goBack: goBackToResults  } = require('../duck-detail/config')

function Header(name, query, lang, ducks, duck, res) {
    const { hello, signUp, signIn, signOut, favorite } = literals[lang]
    const { search } = searchLiterals[lang]

    res.render('home', {
        name,
        hello,
        query,
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
        favoritePath,
        goBackToResults
    })
}

module.exports = Header