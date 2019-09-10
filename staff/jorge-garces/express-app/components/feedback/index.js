// const literals = require('./i18n')

module.exports = function (lang, error) {

    // const { } = literals[lang]

    return `
    <section class='feedback'>
        <p id='redAlert'>${error}</p>
    </section>
    `
}