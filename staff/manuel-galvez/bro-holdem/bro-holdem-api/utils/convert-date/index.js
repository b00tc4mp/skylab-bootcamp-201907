function convertDate(stringDate) {

    const dateArray = stringDate.split('/')
    const month = Number(dateArray[0])
    const year = Number(`20${dateArray[1]}`)

    return new Date(year, month)
}

module.exports = convertDate