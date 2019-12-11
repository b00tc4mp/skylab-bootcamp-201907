const logic = require('../logic')
const Busboy = require('busboy')

module.exports = (req, res) => {
    const { userId, params: { id } } = req
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) =>
        logic.uploadImage(userId, id, file)
            .then(()  => res.json({ message: 'Image successfully uploaded.'}))
    )
    //busboy.on('finish', () => )
    req.pipe(busboy)
}