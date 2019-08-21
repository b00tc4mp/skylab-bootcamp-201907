const jwt = require('jsonwebtoken')

const id = "abc123"

// generation

const token = jwt.sign({ sub: id }, "my super secret")

// verification

try {
    jwt.verify(token + 'hola-mundo', "my super secret")

    debugger
} catch (error) {
    debugger
}
