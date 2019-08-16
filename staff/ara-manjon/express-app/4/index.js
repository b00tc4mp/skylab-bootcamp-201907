const express = require('express')
const { Html, Header, Login, Register, DuckResults, DuckDetail, RegisterSuccess } = require('./components')
const logic = require('./logic')
const session = require('express-session')
const {parseBody} = require('./utils')
const literals = require('./literals')

const { argv: [, , port] } = process

const app = express()

const SEARCH ='/search', SIGN_IN = '/sign-in', SIGN_UP= '/sign-up', SIGN_OUT = '/sign-out'
 
app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}))



app.get('/', (req, res) => {
    const { query: { lang } ,session: { userId, token, query } }= req
    lang? req.session.lang = lang : req.session.lang = 'en'

    try{
        if(userId && token)
        logic.retrieveUser(userId, token)
        .then(user=> res.send(Html(Header(user.name, query, SEARCH, SIGN-IN, SIGN-UP, SIGN-OUT))))
        .catch(error =>{ throw error})
        else
        res.send(Html(Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP,SIGN_OUT)))

    }catch( error ){
        throw error
    }
})

app.get('/search', (req, res) => {
    const {query: { q: query }, session: {userId,token}} = req

    if(!session.query || query.q ) session.query = query.q 
   

    try {
        if (userId && token)
            Promise.all([
                logic.registerUser(userId, token),
                logic.searchDucks(userId, token, query)
            ])
            .then(([user, ducks]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckResults(ducks)}${DuckResults(ducks)}`)))
            .catch(error => {
                throw error
            })

        else
            logic.searchDucks(undefined, undefined, query)
            .then(ducks => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckResults(ducks)}`)))
    } catch (error) {
        throw error
    }
})


app.get('/ducks/:id', (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query} } = req

    try {
        if(userId && token)
        Promise.all([
            logic.retrieveUser(userId, token),
            logic.retrieveDuck(userId, token, duckId)
        ])
        
        .then(([user, duck]) => res.send(Html(`${Header(user.name, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckDetail(duck)}`)))
        .catch(error => {throw error})
    else
    logic.retrieveDuck(undefined, undefined, duckId)
    .then(duck => res.send(Html(`${Header(undefined, query, SEARCH, SIGN_IN, SIGN_UP, SIGN_OUT)}${DuckDetail(duck)}`)))
        
    }catch(error){
        throw error
    }
//goback

/*     .then(({id, token})=>{
        session.userId = id
        session.token = token

        res.redirect('/')
    }) */

})

app.get('/sign-up',(req, res) => {
    const {session: {lang= 'en'}} = req

    res.send(Html(Register(literals[lang].signUp,literals[lang].name,literals[lang].surname,literals[lang].email,literals[lang].password,literals[lang].repassword,'/sign-up')))
})
app.post('/sign-up', parseBody, (req, res)=>{

    const {body}= req 

        
    const { name, surname, email , password, repassword } = body

    try{
        logic.registerUser(name, surname, email, password, repassword)
        .then(()=>res.send(Html(RegisterSuccess('/sign-in'))))
        .catch(error => { throw error })
    }catch(error){
        throw error
    }    
})

 app.get('/sign-in', (req,res) =>{
     const { session: { lang = 'en' } } = req

    res.send(Html(Login(literals[lang].signIn,literals[lang].email,literals[lang].password, '/sign-in')))
}) 


app.post('/sign-in',parseBody,(req, res)=>{
    const {body, session}=req
   const { email , password } = body
   try{
    logic.authenticateUser(email, password)
    .then(({id, token})=>{
        session.userId = id
        session.token = token

        res.redirect('/')
    })
    .catch(error => {throw error})        
   } catch(error){
       throw error
   }
})

app.get('/sign-out', (req, res) => {
    const { session }= req

    delete session.userId
    delete session.token
    res.redirect('/')
})

app.post("/onToggle", parseBody, (req, res) =>{
    const { body: {duckId}, session: { userId, token } } = req

        if (userId && token) 
            logic.retrieveUser(userId, token)
                .then(() => logic.toggleFavDuck(userId, token, duckId))
                .then(() => res.redirect("/search"))
                .catch((error) => console.log(error))
        
        else res.redirect("/sign-in")
    })

app.listen(port)
 