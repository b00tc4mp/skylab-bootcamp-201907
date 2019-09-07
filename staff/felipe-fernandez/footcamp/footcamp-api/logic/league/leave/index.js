const {validate} = require('footcamp-utils')
const { models: { User, League } } = require('footcamp-data')
 
/**
 * Leave league by league id
 * 
 * @param {string} userId 
 * @param {string} leagueId
 * 
 * 
 * @returns {Promise}
*/
module.exports = function(userId, code) {

    validate.string(userId, 'User id')
    validate.string(code, 'code')
   

    return (async()=>{

        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exists`)

        const league = await League.findOne({ code })

        if (!league) throw Error(`cannot find league with code ${ code }`)
        
        const participantExist = league.participants.find(participant=> participant.toString()===id)
        const participantExistIndex = league.participants.findIndex(participant=> participant.toString()===id)
        
        if(!participantExist) throw Error(`User with id ${id} do not play in this league`)
        league.participants.splice(participantExistIndex, 1)
    
        await league.save()
       
    })()
    
}