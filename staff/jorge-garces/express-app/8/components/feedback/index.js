const literals = require('./i18n')

module.exports = function (lang, error) {

    const { } = literals[lang]

    return `
    <section class='landing'>
        <p>${error}</p>
    </section>
    `
}