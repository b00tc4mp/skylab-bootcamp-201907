const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost'

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

// client.connect(error => {
//     if (error) throw error

//     const db = client.db('skylab')

//     const users = db.collection('users')

//     users.insertOne({ name: 'Fula', surname: 'Nito', email: 'fulanito@mail.com', age: 20})

//     client.close()
// })

let users

client.connect()
    .then(() => {
        const db = client.db('skylab')

        users = db.collection('users')

        return users.drop()
    })
    .then(() => {
        //users.insertOne({ name: 'Fula', surname: 'Nito', email: 'fulanito@mail.com', age: 20 })

        return users.insertMany([
            { name: 'Fula', surname: 'Nito', email: 'fulanito@mail.com', age: 20 },
            { name: 'Menga', surname: 'Nito', email: 'menganito@mail.com', age: 21 },
            { name: 'Manu', surname: 'Nito', email: 'manunito@mail.com', age: 22 }
        ])
    })
    .then(() => {
        // find pulling data progressively by means of cursor (the convenient way)
        // const cursor = users.find()
        // cursor.forEach(user => {
        //     console.log(user)
        // })

        // find all (forcing array into memory, not convenient)
        // users.find().toArray()
        //     .then(users => users.forEach(user => console.log(user)))

        // pulling data item by item by means of each
        // return new Promise((resolve, reject) => {
        //     const cursor = users.find()

        //     cursor.each((error, user) => {
        //         if (user) console.log(user)
        //         else resolve()
        //     })
        // })

        // return new Promise((resolve, reject) => {
        //     users.find({}, (err, cursor) => {
        //         cursor.next(processItem)

        //         function processItem(err, user) {
        //             if (user === null) resolve() // All done!
        //             else {
        //                 console.log(user)

        //                 cursor.next(processItem) // Read next item from database
        //             }
        //         }
        //     })
        // })

        return new Promise((resolve, reject) => {
            const cursor = users.find()

            cursor.next(processItem)

            function processItem(err, user) {
                if (user === null) resolve() // All done!
                else {
                    console.log(user)

                    cursor.next(processItem) // Read next item from database
                }
            }
        })
    })
    // find one and update one
    .then(() => users.findOne({ name: 'Manu' }))
    // .then(user => users.updateOne({ _id: user._id }, { $set: { name: 'Manuel' } }))
    // find one and replace
    .then(user => users.findOneAndUpdate({ _id: user._id }, { $set: { name: 'Manuel' } }))
    .then(result => {
        debugger
    })
    .catch(error => { throw error })
    .then(() => client.close())


