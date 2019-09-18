const {validate} = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * Create a league with name and code and it relates to the user
 *
 * @param {*} id 
 * @param {*} name 
 * @param {*} code 
 *  
 * @returns {Promise}
*/

module.exports = function(id, name, code) {
   
    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.string(code, 'code')
   
    return (async () => {

                
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const leagues = await League.findOne({ name })

        if (leagues) throw Error(`league with name ${ name } alredy exists`)

        const leaguesCode = await League.findOne({ code })

        if (leaguesCode) throw Error(`code alredy exists`)

        const league = new League({name, code})
        league.id = league._id

        league.participants.push(id)
        user.leagues.push(league.id)
            
        await user.save()
        await league.save()

        return league.id

    })()
}
