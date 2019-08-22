const express = require('express')
const session = require('express-session')

const { argv: [, , PORT] } = process
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false}))

app.use(express.static(__dirname + '/styles'));

app.use(session({
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true

}))

app.use('/', require('./routes/home'))

app.use('/search', require('./routes/search'))

app.use('/login', require('./routes/login'))

app.use('/register', require('./routes/register'))

app.use('/logout', require('./routes/logout'))

app.use('/detail/', require('./routes/detail'))

app.use('/favorites', require('./routes/favorites'))

app.use('/toggle-favorite', require(`./routes/toggle-fav-duck`))

app.listen(PORT, () => console.log(`Server started in port ${PORT}`))
