const express = require('express')
const http = require('http')
const { Html, Header, Search, Login, Register, DuckResults, DuckDetail, RegisterSuccess } = require('./components')
const logic = require('./logic')
const session = require('express-session')
const {parseBody} = require('./utils')

const { argv: [, , port] } = process

const app = express()
 
app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}));


app.get('/', (req, res) => {
    res.send(Html(`${Header()}${Search()}`))
})


app.get('/search', (req, res) => {
    const { query: { q }, session: {userId, token} } = req

    session.query = q

try{
    logic.searchDucks(userId, token, q)
    .then(ducks => res.send(Html(`${Header()}${Search(session.query)}${DuckResults(ducks)}`)))
    .catch(error => {throw error})    
  } catch(error){
    throw error
}

})

app.get('/ducks/:id', (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query} } = req

    try {
        logic.retrieveDuck(userId, token, duckId)
        .then(duck => res.send(Html(`${Header()}${Search(session.query)}${DuckDetail(duck)}`)))
        .catch(error => {throw error})
    }catch(error){
        throw error
    }

})

app.get('/register',(req, res) => {
    res.send(Html(Register('/register')))
})
app.post('/register', parseBody, (req, res)=>{

    const {body}= req 

        
    const { name, surname, email , password, repassword } = body

    try{
        logic.registerUser(name, surname, email, password, repassword)
        .then(()=>res.send(Html(RegisterSuccess())))
    }catch(error){
        throw error
    }    
})

 app.get('/register-success', (req,res) =>{
    res.send(Html(Login('/login')))
}) 

app.get('/login',(req, res) => {
    res.send(Html(Login()))
})

app.post('/login',parseBody,(req, res)=>{
    const {body, session}=req
   const { email , password } = body
   try{
    logic.authenticateUser(email, password)
    .then(({id, token})=>{
        session.userId = id
        session.token = token

        res.redirect('/home')
    })
    .catch(error => {throw error})        
   } catch(error){
       throw error
   }
})

app.get('/home', (req, res) => {
    res.send(Html(`${Header()}${Search(session.query)}`))
})


app.listen(port)
 