function Header(content) {
    return `<header> 
    <h2>${content ? content : ''}</h2>
    </header>`
}

module.exports = Header