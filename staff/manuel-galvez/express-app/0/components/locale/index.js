function LocaleSelector() {
    return `<form class="locale__form form" method="POST" action="/locale">
                <li><button class="menu__option locale__btn" type="submit" name="lang" value="en">EN</button></li>
                <li><button class="menu__option locale__btn" type="submit" name="lang" value="es">ES</button></li>
                <li><button class="menu__option locale__btn" type="submit" name="lang" value="ca">CA</button></li>
                <li><button class="menu__option locale__btn" type="submit" name="lang" value="fr">FR</button></li>
            </form>`
}

module.exports = LocaleSelector