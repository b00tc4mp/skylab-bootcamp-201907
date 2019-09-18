const logic = require('../../logic')
const Busboy = require('busboy')
module.exports = (req, res) => {
    debugger
    const { userId, params: { id } } = req
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) =>
        logic.uploadImage(userId, id, file)
            .then(() => res.json({ message: 'Dog image successfully uploaded.' }))
    )
    //busboy.on('finish', () => )
    req.pipe(busboy)
}