function add(values) {
    return values.reduce((accum, value) => accum + Number(value), 0)
}

function mul(values) {
    return values.reduce((accum, value) => accum * Number(value), 1)
}

module.exports = { add, mul }