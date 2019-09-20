const literals = require('./i18n')
const { path } = require('./config')

module.exports = function(lang, view, error) {
    const { title, email, password, back } = literals[lang]
    return `<section class="login">
            <h2${title}</h2>
            <form method="post" action="${path}">
                <label>${email}</label>
                <input type="email" name="email" placeholder="${email}" />
                <label>${password}</label>
                <input type="password" name="password" placeholder="${password}" />
                <button>${title}</button>
            </form>
            ${error ? Feedback(error) : ''}
            <a class="back" href="${view}">${back}</a>
        </section>`
}