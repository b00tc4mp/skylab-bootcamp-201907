const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang, res) {
    const { success, signIn } = literals[lang]
    
//     return `<p>
//         ${success} <a href="${path}">${signIn}</a>.
// </p>`

res.render('register-success', { success, path, signIn } )
}