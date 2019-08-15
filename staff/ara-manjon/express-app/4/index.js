const express = require('express')
const http = require('http')
const { Html, Header, Search, Login, Register, DuckResults, DuckDetail, RegisterSuccess } = require('./components')
const logic = require('./logic')
const session = require('express-session')
const bodyParser = require('body-parser')

const { argv: [, , port] } = process

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng'
}));


app.get('/', (req, res) => {
    res.send(Html(`${Header()}${Search()}`))
})


app.get('/search', (req, res) => {
    const { query: { q }, session } = req

    session.query = q

    const request = http.get(`http://duckling-api.herokuapp.com/api/search?q=${q}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const ducks = JSON.parse(content)

            if (ducks.error) throw new Error(ducks.error)

            res.send(Html(`${Header()}${Search(session.query)}${DuckResults(ducks)}`))
        })
    })

    request.on('error', error => { throw error })
})

app.get('/ducks/:id', (req, res) => {
    const { params: { id }, session } = req

    const request = http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            const duck = JSON.parse(content)

            if (duck.error) throw new Error(duck.error)

            res.send(Html(`${Search(session.query)}${DuckDetail(duck)}`))
        })
    })

    request.on('error', error => { throw error })
})

app.get('/sign-up',(req, res) => {
    res.send(Html(Register('/sing-up')))
})
app.post('/sign-up',(req, res)=>{

        
    const { name, surname, email , password, repassword } = req.body

    logic.registerUser(name, surname, email, password, repassword)
    res.send(Html(RegisterSuccess()))
    
    
})
 app.get('/register-success', (req,res) =>{
    res.send(Html(Login('/login')))
}) 

app.get('/login',(req, res) => {
    res.send(Html(Login()))
})

app.post('/login',(req, res)=>{
   const { email , password } = req.body
   debugger
    logic.authenticateUser(email, password)
    .then(data => logic.retrieveUser(data.id, data.token))
    .then(response => res.send(`<h3>Hello, ${response.name}</h3>${Header()}${Search()}`))     
})
app.listen(port)
 