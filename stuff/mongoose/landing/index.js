const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } } } = mongoose

const cardSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    cards: [cardSchema]
})

const carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck'],
        default: 'tourism'
    },
    color: {
        type: String,
        required: true
    },
    electric: {
        type: Boolean,
        required: true,
        default: false
    },
    owner: { type: ObjectId, ref: 'User' }
})

const propertySchema = new Schema({
    address: {
        type: String,
        required: true
    },
    m2: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cadastre: {
        type: String,
        required: true
    },
    owners: [{ type: ObjectId, ref: 'User' }],
})


const User = mongoose.model('User', userSchema)
const Car = mongoose.model('Car', carSchema)
const Property = mongoose.model('Property', propertySchema)
const Card = mongoose.model('Card', cardSchema)

mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => Promise.all([User.deleteMany(), Car.deleteMany(), Property.deleteMany()]))
    .then(() => {
        const pepito = new User

        pepito.name = 'Pepito'
        pepito.surname = 'Grillo'
        pepito.email = 'pepitogrillo@gmai.com'
        pepito.password = '123'

        const pepita = new User

        pepita.name = 'Pepita'
        pepita.surname = 'Grillo'
        pepita.email = 'pepitagrillo@gmai.com'
        pepita.password = '123'

        const beatle = new Car({ brand: 'Volkswagen', model: 'Beatle', year: 2018, electric: true, type: 'cabrio', color: 'skyblue' })
        beatle.owner = pepito._id

        const coco = new Property({ address: 'El Jardin de LLuis', m2: 0.25, year: 2018, cadastre: '123abc456' })
        coco.owners.push(pepita._id)
        coco.owners.push(pepito._id)

        const card = new Card({ number: '1234 5678 1234 5678', expiry: new Date })

        pepita.cards.push(card)

        return Promise.all([pepito.save(), pepita.save(), beatle.save(), coco.save()])
    })
    .then(() => Property.find().populate('owners'))
    .then(properties => {debugger; properties.forEach(property => console.log(property))})
    .then(() => Car.find().populate('owner'))
    .then(cars => cars.forEach(car => console.log(car)))
    .then(() => mongoose.disconnect())
