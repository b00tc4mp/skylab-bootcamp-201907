const express = require('express')
const session = require('express-session')
const logic = require('./logic')

const { argv: [, , port] } = process

const {
    HOME,
    SEARCH,
    SIGN_IN,
    SIGN_UP,
    SIGN_OUT,
    DETAIL,
    TOGGLE_FAV,
    LOCALE,
    FAVORITES
} = require('./constants')


const app = express()

app.use(express.static('public'))

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))

app.use(express.urlencoded())

app.get('/sign-up', (req, res) => {
        res.send(`<form class="register__form form" method="post" action="/sign-up">
                    <label for="register-name">Name</label>
                    <input class="register__input register__name form__input" id="register-name" type="text" name="name" />
                    <label for="register-surname">Surname</label>
                    <input class="register__input register__name form__input" id="register-surname" type="text" name="surname" />
                    <label for="register-email">E-mail</label>
                    <input class="register__input register__name form__input" id="register-email" type="email" name="email" />
                    <label for="register-password">Password</label>
                    <input class="register__input register__name form__input" id="register-password" type="password" name="password" />
                    <label for="register-repassword">Password</label>
                    <input class="register__input register__name form__input" id="register-repassword" type="password" name="repassword" />
                    <button class="register__submit btn btn--primary">Repassword</button>
                </form>`) 
})

app.post('/sign-up', (req, res) => {
    const { body, session: { lang = 'en' } } = req

    const { name, surname, email, password, repassword } = body
    debugger


    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(response => res.send(JSON.stringify(response)))
            .catch(error => error)
    } catch (error) {
        console.log(error)
        
    }
})



app.listen(port)