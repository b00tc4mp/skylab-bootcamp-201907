const {validate} = require('footcamp-utils')
const { models: { User,  League, Team } } = require('footcamp-data')

 /**
 * retrieves all the teams of the league
 * @param {*} id 
 * @param {*} code 
 *
 *  
 * @returns {Promise}
*/

module.exports = function(id, code) {
   
    validate.string(id, 'id')
    validate.string(code, 'code')
    
   
    return (async () => {

                
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ code })

        if (!league) throw Error(`League with code ${ code } does not exist`)

        const teams = await Promise.all(league.team.map(team => team))

        let allTeams = []

        //create an array of objects with the properties of the teams to return
        teams.forEach(element => {
          let  team = {
            name :  element.name,
            points : element.points,
            owner : element.owner.toString()
            }
            allTeams.push(team)
        })
       
                

        return allTeams
        

    })()
}
