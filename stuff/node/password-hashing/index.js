const bcrypt = require('bcryptjs')

const password = '123';

(async () => {
    // registering a user
    const hash = await bcrypt.hash(password, 10)
    console.log('now we would save hash into db', hash)
    // user.password = hash
    // user.save()

    // authenticating a user
    // const user = await User.findOne({ email })
    // const hash = user.password
    const good = await bcrypt.compare(password, hash)
    // const good = await bcrypt.compare(password + '1', hash) // FORCE fail
    if(good) console.log('ok, password matches the hash')
    else console.error('ko, password does not match hash')
})()