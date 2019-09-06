const {validate} = require('skyshop-utils')
const { models:{User} } = require('skyshop-data')  //referencia a un modulo 

/**
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} isAdmin
 * 
 * @returns {Promise}
 */

module.exports = function(name, surname, email, password,isAdmin) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')
    //validate.boolean(isAdmin,'isAdmin')

    return(async()=>{
        const user= await User.findOne({ email })

            if (user) throw Error(`user with e-mail ${email} already exists`)
            await User.create({name, surname, email, password,isAdmin})
            return user
       /*  .then(() => { }) */
    })()
    
/*     return User.findOne({ email })
        .then(user => {
            if (user) throw Error(`user with e-mail ${email} already exists`)
            return User.create({name, surname, email, password})
        }).then(() => { }) */
}




