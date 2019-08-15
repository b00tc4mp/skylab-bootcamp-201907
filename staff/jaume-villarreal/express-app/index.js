const express = require('express')

const http = require('http')

const bodyParser = require('body-parser')

const { Html, Header, Search, DuckResults,
        DuckDetail, RegisterLogin,
        Register, RegisterSuccess, Login,
        Home
        } = require('./components')

const logic = require('./logic')

const session = require('express-session')

const { argv: [, , port] } = process

const app = express()

const urlencodedParser = bodyParser.urlencoded( {extended : true} )    //app.use(bodyParser.urlencoded({extended : true}))

app.use(session({
    secret: 's3cr3t th1ng',
    resave: false,
    saveUninitialized: false
}));


app.get('/', (request, response) => {
    const { userId , token } = session

    // if(userId && token){
    //     userId = undefined
    //     token = undefined
    // }

    response.send(Html(`${Header(`${RegisterLogin()}`)}${Search()}`))
})

app.get('/search', (request, response) => {
    const { query: { q }, session: { userId , token} } = request

    session.query = q
    
    try{
        logic.searchDucks(userId , token , q)
            .then(ducks => response.send(Html(`${Search(session.query)}${DuckResults(ducks)}`)))
            .catch( error => { throw error })
    } catch(error){ throw error}
    
})

app.get('/ducks/:id', (request, response) => {
    const { params: { id: duckId }, session } = request

    try{
        logic.retrieveDuck(userId , token , duckId)
            .then( response.send(Html(`${Search(session.query)}${DuckDetail(duckId)}`)))
            .catch( error => { throw error })
    } catch(error){
        throw error
    }
})

app.get('/register' , (request , response) => {
    response.send(Html( Register('/register') ))
})

app.post('/register' , urlencodedParser , (request,response)=>{
    const {name , surname , username , password , repassword} = request.body
    logic.registerUser(name , surname , username , password , repassword)
    .then(_response => {
        response.send(Html(`${RegisterSuccess()}`))
    })
})

app.get('/login' , (request , response) => {
    response.send(Html(Login()))
})

app.post('/login' , urlencodedParser , (request , response) => {
    const { username , password } = request.body

    const { session } = request

    try{
        logic.authenticateUser(username , password)
            .then( ({ id , token }) => {
                session.userId = id
                session.token = token
                response.redirect('/home')
            })
            .catch( error => { throw error })
    }
    catch(error){ throw error}
    
            
})

app.get('/home' , (request , response) => {
    const { session : { userId , token } } = request

    try{
        debugger
        logic.retrieveUser( userId , token)
            .then( ({ name }) => response.send(Html(`${Home(name)}`)))
    } catch(error){
        throw error
    }

    
})

app.listen(port)