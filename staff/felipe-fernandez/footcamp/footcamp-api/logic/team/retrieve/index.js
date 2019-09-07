const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * retrieves a team by name within the league and linked to the user id
 * @param {*} id 
 * @param {*} code 
 * @param {*} name 
 * @param {*} points 
 *  
 * @returns {Promise}
*/

module.exports = function(id, code, name, points) {
   
    validate.string(id, 'id')
    validate.string(code, 'code')
    validate.string(name, 'name')
    validate.number(points, 'points')
   
    return (async () => {

                
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ code })

        if (!league) throw Error(`League with code ${ code } does not exist`)

        const findTeam = await Team.findOne({ name })

        if (!findTeam) throw Error(`Team with name ${ name } does not exist`)

         //check the team in the database and select name, owner and players ids
        let _name, points, owner
        let players = []
        
        _name= findTeam.name
        points = findTeam.points
        owner = findTeam.owner.toString()
        findTeam.players.forEach(element => {
            players.push(element.toString())
            
        })
        
        let getHome = { _name, points, owner, players}

        // await user.save()
        // await league.save()
        

        return getHome

    })()
}
