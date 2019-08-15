function Header(content) {
    return `<header> 
    <h2>Wellcome${content ? content : ''}</h2>
    </header>`
}

module.exports = Header