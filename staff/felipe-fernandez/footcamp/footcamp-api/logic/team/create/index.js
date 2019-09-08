const {validate} = require('footcamp-utils')
const { models: { User,  League, Team, Player } } = require('footcamp-data')

 /**
 * creates a team by name within the league and linked to the user id
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
        
        //if the user is not in the league he cannnot create a team in this league
        if (!(league.participants.includes(user.id))) throw Error(`You haven't joined the league with code ${code} yet`)

        //TODO
        //not possible to create a team in the league if the user has one team created
        if(league.team.includes({owner: user.id})) throw Error(`You cannot create more than one tea in this league`)
              
        const team = new Team({code, name})
    

        //associate the owner of the team to this team
        team.owner = id

        //add team to the array in the league
        league.team.push(team)

        //select all the players of the database
        const players = await Player.find({}).lean()
        

        let goalkeeper = [] , defender =[], midfielder=[], striker = [], playersUsed = []

        //select all the players by position and splice 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers

        //filter all the players by position
        const goalkeepers = players.filter(player => player.position === 1).splice(0,20) 
        const defenders = players.filter(player => player.position === 2).splice(0,100)
        const midfielders = players.filter(player => player.position === 3).splice(0,100)
        const strikers = players.filter(player => player.position === 4).splice(0,100)

        //get a number  of players random and not repetead
        for (let i=0; i<2; i++){
            let keeper = goalkeepers[Math.floor(Math.random() * goalkeepers.length)]
                if(!(playersUsed.includes(keeper))){
                    goalkeeper.push(keeper)
                    playersUsed.push(keeper)
                }
            }
            
        for (let i=0; i<10; i++){
            let def = defenders[Math.floor(Math.random() * defenders.length)]
                if(!(playersUsed.includes(def)) && defender.length<6){
                    defender.push(def)
                    playersUsed.push(def)
                }

        }
        for (let i=0; i<10; i++){

            let mid = midfielders[Math.floor(Math.random() * midfielders.length)]
                if(!(playersUsed.includes(mid)) && midfielder.length<6){
                    midfielder.push(mid)
                    playersUsed.push(mid)
                }
        }
        for (let i=0; i<10; i++){

            let strike = strikers[Math.floor(Math.random() * strikers.length)]
                if(!(playersUsed.includes(strike))&& striker.length<4){
                    striker.push(strike)
                    playersUsed.push(strike)
                }

        }

        //extract the id of the players
        debugger
        let idsGoalkeeper = [], idsDefender=[], idsMidfielder=[], idsStriker= []
        idsGoalkeeper = goalkeeper.map((player)=> {
            player._id.toString(),
            player.id
        })

        idsDefender = defender.map((player)=> {
            player._id.toString(),
            player.id})

        idsMidfielder = midfielder.map((player)=> {
            player._id.toString(),
            player.id
        })

        idsStriker = striker.map((player)=> {
            player._id.toString(),
            player.id
        })

        //put the ids into an array
       let initialTeam=[...idsGoalkeeper, ...idsDefender, ...idsMidfielder, ...idsStriker]

        //insert all the ids in the array of players of the team 
        initialTeam.forEach((element, i) => {
            team.players.push(element)
        })
       
        
        await league.save()
        await team.save()
 
        return team.players

                 

    })()
}
