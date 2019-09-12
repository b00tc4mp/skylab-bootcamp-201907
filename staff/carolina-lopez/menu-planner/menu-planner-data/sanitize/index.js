module.exports = {
    id(data) {
        data.id = data._id.toString()
        delete data._id
    }
}