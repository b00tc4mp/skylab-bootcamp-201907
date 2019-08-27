function checkZero(n) {
    return n < 10 ? '0' + n : n

}

function randomDate() {
    let day = Math.floor(Math.random() * ((30 - 1) + 1) + 1)
    let month = Math.floor(Math.random() * ((12 - 1) + 1) + 1)
    let year = Math.floor(Math.random() * ((2026 - 2019) + 1) + 2019)

    const date = new Date()
    return new Date(`${year}/${checkZero(month)}/${checkZero(day)}`)
}

module.exports = randomDate