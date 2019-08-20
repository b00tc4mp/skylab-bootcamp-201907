// const literals = require('./i18n')

module.exports = function (lang, error) {

    // const { } = literals[lang]

    return `
    <section class='feedback'>
        <p>${error}</p>
    </section>
    `
}