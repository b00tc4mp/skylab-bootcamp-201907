const {validate} = require('footcamp-utils')
const { models: { User,  League, Team , Player } } = require('footcamp-data')

 /**
 * retrieves a static lineup for the team of the user
 * @param {*} id 
 * @param {*} code 
 * @param {*} name 
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

        const team = await Team.findOne({ name })

        if (!team) throw Error(`Team with name ${ name } does not exist`)

        //if the team exists extract 11 players: 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers

        // get all the players of the team into an array
        const lineup = []

                               
        
       const players = await Promise.all(team.players.map((idPlayer) =>
            Player.findOne({ _id : idPlayer})
         ))


        let goalkeeper= players.find(player => player.position === 1) 

        lineup.push(goalkeeper)
 
        for(let i=0; i<4 ; i++) {
         let defender = players.find(player => player.position === 2)
         lineup.push(defender)
        }
 
        for(let i=0; i<4 ; i++) {
         let midfielder = players.find(player => player.position === 3)
         lineup.push(midfielder)
        }
 
        for(let i=0; i<2 ; i++) {
         let striker = players.find(player => players.position === 4)
         lineup.push(striker)
        }      
             
         team.save()
 
         return lineup

    

    


    })()
}
