function Home(header, pathFav, pathLogout, search) {
    return `${header}
    <a href=${pathFav}>Favorites</a>
    <a href=${pathLogout}>Logout</a>
    ${search}
   `
}

module.exports = Home