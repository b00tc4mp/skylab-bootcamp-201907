
let year, month, day

day = Math.floor(Math.random() * ((30 - 1) + 1) + 1)
month = Math.floor(Math.random() * ((12 - 1) + 1) + 1)
year = Math.floor(Math.random() * ((2026 - 2019) + 1) + 2019)


module.exports = {
    day: day,
    month: month,
    year: year
}