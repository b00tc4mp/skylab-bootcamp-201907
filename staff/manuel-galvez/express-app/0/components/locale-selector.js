function LocaleSelector() {
    return `<form method="POST" action="/test/locale">
                <select name="lang">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="ca">Català</option>
                </select>
                <input type='submit' name='submit'/>
            </form>`
}

module.exports = LocaleSelector