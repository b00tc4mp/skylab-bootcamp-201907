const express = require('express')

const http = require('http')

const bodyParser = require('body-parser')

const { Html, Header, Search, DuckResults,
        DuckDetail, RegisterLogin,
        Register, RegisterSuccess , Login 
        } = require('./components')

const session = require('express-session')

const FileStore = require('session-file-store')(session);

const { argv: [, , port] } = process

const app = express()
 


app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded( {extended : true} ))

app.use(bodyParser.json())


app.get('/', (request, response) => {
    response.send(Html(`${Header(`${RegisterLogin()}`)}${Search()}`))
})

app.get('/search', (request, response) => {
    const { query: { q }, session } = request

    session.query = q

    const httpRequest = http.get(`http://duckling-api.herokuapp.com/api/search?q=${q}`, httpResponse => {
        httpResponse.on('error', error => { throw error })

        let content = ''

        httpResponse.on('data', chunk => content += chunk)

        httpResponse.on('end', () => {
            const ducks = JSON.parse(content)

            if (ducks.error) throw new Error(ducks.error)

            response.send(Html(`${Search(session.query)}${DuckResults(ducks)}`))
        })
    })

    httpRequest.on('error', error => { throw error })
})

app.get('/ducks/:id', (request, response) => {
    const { params: { id }, session } = request

    const httpRequest = http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, httpResponse => {
        httpResponse.on('error', error => { throw error })

        let content = ''

        httpResponse.on('data', chunk => content += chunk)

        httpResponse.on('end', () => {
            const duck = JSON.parse(content)

            if (duck.error) throw new Error(duck.error)

            response.send(Html(`${Search(session.query)}${DuckDetail(duck)}`))
        })
    })

    httpRequest.on('error', error => { throw error })
})

app.get('/register' , (request , response) => {
    response.send(Html(`${Register()}`))
})

app.get('/login' , (request , response) => {
    response.send(Html(`${Login()}`))
})

app.get('/registersuccess' , (request,response)=>{
    response.send(Html(`${RegisterSuccess()}`))
})

app.post('/registersuccess' , (request,response)=>{
    const name = request.body.id
    alert(name)
})


app.listen(port)