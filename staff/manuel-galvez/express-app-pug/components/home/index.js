const locale = require('./i18n')

module.exports = function(lang) { 
    const { head, tail } = locale[lang]
    return `<section class="home">
        <div class="home__head">
        ${head}
        </div>
        <div class="home__tail">${tail}</div>
    </section>`
}
