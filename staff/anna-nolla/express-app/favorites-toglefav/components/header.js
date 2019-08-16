function Header(content) {
    return `<header>
    <ul>
        <li><a href="/sign-up">Register</a></li>
        <li><a href="/sign-in">Login</a></li>
    </ul>
    ${content}
    </header>`
}

module.exports = Header