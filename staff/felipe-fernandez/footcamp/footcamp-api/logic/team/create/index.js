const {validate} = require('footcamp-utils')
const { models: { User,  League, Team, Player } } = require('footcamp-data')

 /**
 * Creates a team by name within the league and linked to the user 
 *
 * @param {*} id 
 * @param {*} code 
 * @param {*} name 
 * @param {*} points 
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

        if (findTeam) throw Error(`Team with name ${ name } already exist`)
        
        //if the user is not in the league is not possible to  create a team
        if (!(league.participants.includes(user.id))) throw Error(`You haven't joined the league with code ${code} yet`)

        
        // //TODO
        // //not possible to create a team in the league if the user has one team created
        // if(league.team.includes({owner: user.id})) throw Error(`You cannot create more than one tea in this league`)
              
        const team = new Team({code, name})
    
        //associate the owner of the team to this team
        team.owner = id

        //select all the players of the database
        const players = await Player.find({}).lean()
        
        let goalkeeper = [] , defender =[], midfielder=[], striker = [], playersUsed = []

        //select all the players by position and splice 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers

        //filter all the players by position
        const goalkeepers = players.filter(player => player.position === 1).splice(0,20) 
        const defenders = players.filter(player => player.position === 2).splice(0,100)
        const midfielders = players.filter(player => player.position === 3).splice(0,100)
        const strikers = players.filter(player => player.position === 4).splice(0,100)

        let match, keeper
           
        for (let i=0; i<2; i++){
            
            do {
                keeper = goalkeepers[Math.floor(Math.random() * goalkeepers.length)]
                match = playersUsed.includes(keeper)
            } while(match)
                goalkeeper.push(keeper)
                playersUsed.push(keeper)
                match = false
        }
        
        let match2, def

        for (let i=0; i<6; i++){
            do {
                def = defenders[Math.floor(Math.random() * defenders.length)]
                match2 = playersUsed.includes(def)
            }while(match)
                defender.push(def)
                playersUsed.push(def)
                match = false

        }

        let match3,mid

        for (let i=0; i<6; i++){
            do {
              
              mid = midfielders[Math.floor(Math.random() * midfielders.length)]
              match3 = playersUsed.includes(mid)
            }while(match)
                midfielder.push(mid)
                playersUsed.push(mid)
                match = false
        }

         let match4, strike
         for (let i=0; i<4; i++){
            do {
                 strike = strikers[Math.floor(Math.random() * strikers.length)]
                 match4 = playersUsed.includes(strike)
            }while(match)
                striker.push(strike)
                playersUsed.push(strike)
                match = false

        }

        //extract the id of the players
        let idsGoalkeeper = [], idsDefender=[], idsMidfielder=[], idsStriker= []
        idsGoalkeeper = goalkeeper.map((player)=>  player._id.toString())
        idsDefender = defender.map((player)=>  player._id.toString() )
        idsMidfielder = midfielder.map((player)=>  player._id.toString())
        idsStriker = striker.map((player)=> player._id.toString())

        //put the ids into an array
       let initialTeam=[...idsGoalkeeper, ...idsDefender, ...idsMidfielder, ...idsStriker]

        //insert all the ids in the array of players of the team 
        initialTeam.forEach((element) => {
            team.players.push(element)
        })
    
        //add team to the array in the league
        league.team.push(team)

        team.id = team._id
        delete team._id
       
        await team.save()
        await league.save()
      
        return initialTeam
   

    })()
}
