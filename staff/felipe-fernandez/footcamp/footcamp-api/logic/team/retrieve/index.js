const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * retrieves a team by name within the league and linked to the user id
 * @param {*} id 
 * @param {*} code 
 * @param {*} name 
 * 
 *  
 * @returns {Promise}
*/

module.exports = function(id, code, name) {
   
    validate.string(id, 'id')
    validate.string(code, 'code')
    validate.string(name, 'name')
   
    return (async () => {

                
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ code })

        if (!league) throw Error(`League with code ${ code } does not exist`)

        const findTeam = await Team.findOne({ name })

        if (!findTeam) throw Error(`Team with name ${ name } does not exist`)

         //check the team in the database and select name, owner and players ids
        let name_team, points, owner
        let players = []
        debugger
        name_team= findTeam.name
        points = findTeam.points
        owner = findTeam.owner.toString()
        findTeam.players.forEach(element => {
            players.push(element.toString())
            
        })
        
        let team = { name_team, points, owner, players}

        

        return team

    })()
}
