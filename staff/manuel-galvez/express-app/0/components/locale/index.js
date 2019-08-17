function LocaleSelector() {
    return `<form method="POST" action="/locale">
                <button type="submit" name="lang" value="en">EN</button>
                <button type="submit" name="lang" value="es">ES</button>
                <button type="submit" name="lang" value="ca">CA</button>
                <button type="submit" name="lang" value="fr">FR</button>
            </form>`
}

module.exports = LocaleSelector