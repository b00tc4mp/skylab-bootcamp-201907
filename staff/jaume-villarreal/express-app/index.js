const express = require('express')

const http = require('http')

const bodyParser = require('body-parser')

const { Html, Header, Search, DuckResults,
        DuckDetail, RegisterLogin,
        Register, RegisterSuccess , Login 
        } = require('./components')

const { registerUser, authenticateUser,
        retrieveUser, toggleFavDuck
        } = require('./logic')

const session = require('express-session')

// const FileStore = require('session-file-store')(session);

const { argv: [, , port] } = process

const app = express()

app.use(bodyParser.urlencoded({extended : true}))   // const urlencodedParser = bodyParser.urlencoded( {extended : true} )
app.use(bodyParser.json())                          // const jsonParser = bodyParser.json()
app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng',
    resave: false,
    saveUninitialized: false
}));




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
    response.send(Html( Register('/register') ))
})

app.post('/register' , (request,response)=>{
    const {name , surname , username , password , repassword} = request.body
    registerUser(name , surname , username , password , repassword)
    .then(_response => {
        response.send(Html(`${RegisterSuccess()}`))
    })
})

app.get('/login' , (request , response) => {
    response.send(Html(Login()))
})

app.post('/login' , (request , response) => {
    const { username , password } = request.body
    authenticateUser(username , password)
        .then( data => {
            const { id , token } = data
            return retrieveUser(id,token)
        })
        .then(user =>{
            const { name } = user
            console.log(name)
            response.send(Html(`<h3>Hello ${name}</h3>`))
        })
})

app.listen(port)