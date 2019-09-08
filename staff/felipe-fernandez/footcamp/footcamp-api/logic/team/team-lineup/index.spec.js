require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve lineup', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code
    let namePlayer, surnamePlayer, player_id, real_team, position, points_per_game,  total_points,  yellow_cards,  red_cards,  goals,  minutes,  cost
    
    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points= 0
  
         return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            await Player.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league = new League({id, name: nameLeague, code})

            const team = new Team({id, name: nameTeam, points})
            team.owner = id
             
            for(let i = 0; i < 50; i++){
                let min =1
                let max= 4
                let random = Math.random()
                let randomNumber = Math.floor(random * (max -min +1)) +min
                namePlayer = `name-${Math.random()}`
                surnamePlayer = `surname-${Math.random()}`
                player_id = number(1111,2241111)
                real_team = `realTeam-${Math.random()}`
                position = randomNumber
                points_per_game = number(1111,2241111)
                total_points = number(1111,2241111)
                yellow_cards = number(1111,2241111)
                red_cards = number(1111,2241111)
                goals = number(1111,2241111)
                minutes = number(1111,2241111)
                cost = number(1111,2241111)
                const player = new Player({name: namePlayer, surname: surnamePlayer, player_id, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  })
                team.players.push(player_id)
                await player.save()
            }
            await users.save()
            await team.save()
            await league.save()



                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        debugger
        const result = await logic.lineUpTeam(id, code, nameTeam)
        
        
            expect(result).to.exist
            expect(result.length).to.equal(11)
            expect(result[0].position).to.equal(1)
            expect(result[1].position).to.equal(2)
            expect(result[2].position).to.equal(2)
            expect(result[3].position).to.equal(2)
            expect(result[4].position).to.equal(2)
            expect(result[5].position).to.equal(3)
            expect(result[6].position).to.equal(3)
            expect(result[7].position).to.equal(3)
            expect(result[8].position).to.equal(3)
            expect(result[9].position).to.equal(4)
            expect(result[10].position).to.equal(4)
           

        
    })


    it('should fail if the league does not exist', async () => {

        await League.create({ id, name: nameLeague, code })
        await League.deleteMany()
        try {
             await logic.lineUpTeam(id, code, nameTeam)
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`League with code ${code} does not exist`)
        }
     })

    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.lineUpTeam(id, code, nameTeam)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exist`)
        }
        
    })

    it('should fail if the team name does not exist', async () => {

        await League.create({ id, name: nameLeague,code  })

       
        try {
            await logic.lineUpTeam(id, code, '12345')
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`Team with name 12345 does not exist`)
        }
        
    })
     
     

    it('should fail on undefined league name', () => 
        expect(() => 
            logic.lineUpTeam(id, code, undefined)
     ).to.throw(`name with value undefined is not a string`)
    )

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.lineUpTeam(undefined, code, nameTeam)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined code', () => 
        expect(() => 
            logic.lineUpTeam(id, undefined, nameTeam)
    ).to.throw(`code with value undefined is not a string`)
    )
    


    it('should fail on non-string team name', () => 
        expect(() => 
            logic.lineUpTeam(id, code, 12345)
    ).to.throw(`name with value 12345 is not a string`)
    )

    it('should fail on non-string user id', () => 
        expect(() => 
            logic.lineUpTeam(12345, code, nameTeam)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string code', () => 
        expect(() => 
            logic.lineUpTeam(id, 12345, nameTeam)
    ).to.throw(`code with value 12345 is not a string`)
    )

   
            
     it('should fail on empty id', () => 
        expect(() => 
                logic.lineUpTeam('', code, nameTeam)
        ).to.throw(`id is empty or blank`)
        )

    it('should fail on empty code', () => 
        expect(() => 
                logic.lineUpTeam(id, '', nameTeam)
    ).to.throw(`code is empty or blank`)
        )

    it('should fail on empty name team', () => 
         expect(() => 
                logic.lineUpTeam(id, code, '')
    ).to.throw(`name is empty or blank`)
        )



    after(() => database.disconnect())
})