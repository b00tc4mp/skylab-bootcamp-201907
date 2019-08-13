function add(values) {
    return values.reduce((accum, value) => accum + Number(value), 0)
}

module.exports = add