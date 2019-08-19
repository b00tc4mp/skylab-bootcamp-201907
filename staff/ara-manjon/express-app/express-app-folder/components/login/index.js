const literals = require('./i18n')
const { path, goBackPath } = require('./config')
const Feedback = require('../feedback')

module.exports = function(lang, error) {
    const {title, email, password, goBack } = literals[lang]
    return ` <section class="formSign--register"><h1>${title}</h1>
        <form class="formSign--form" method="post" action="${path}">
            <label class="formSign--label">${email}<input class="formSign--input" type="email" name="email" /></label>
            <label class="formSign--label">${password}<input class="formSign--input" type="password" name="password"/></label>
            <button class="formSign--button" >${title}</button>
        </form>
        ${(error && Feedback(error)) || ''}
        <a class="formSign--goback" href="${goBackPath}">${goBack}</a></section>`
}


