const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../../logic')
const { Game, User, Player } = require('../../../models')

describe('logic - start game', () => {

    before(() => {
        mongoose.connect('mongodb://localhost/bro-holdem-test', { useNewUrlParser: true })
    })


    let username, email, password, hostId
    let username2, email2, password2, joinerId
    let name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase
    let gameId, validHost

    beforeEach(() => {
        // User 1: Host
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        // User 2: Joiner
        username2 = `username-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `password-${Math.random()}`


        // Game
        name = `gameName-${Math.random()}`
        max_players = Number((Math.random() * (6 - 4) + 4).toFixed())
        initial_stack = Number(Math.random().toFixed())
        initial_bb = Number(Math.random().toFixed())
        initial_sb = Number(Math.random().toFixed())
        blinds_increase = Number(Math.random().toFixed())


        return (async () => {

            // Register users
            await User.deleteMany()
            await Game.deleteMany()
            const host = new User({ username, email, password })
            hostId = host.id
            const joiner = new User({ username: username2, email: email2, password: password2 })
            joinerId = joiner.id

            // Replicate host game (create new game and add host as a player)
            const newGame = new Game({ name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase })
            gameId = newGame.id
            newGame.host = hostId

            // Create new instance of player for host
            const newPlayer = new Player({
                position: newGame.players.length,
                current_stack: initial_stack,
                cards: [],
                in_hand: false,
                bet_amount: 0
            })
            newPlayer.user = hostId
            newGame.players.push(newPlayer)

            // Create new instance of player for joiner
            const newPlayer2 = new Player({
                position: newGame.players.length,
                current_stack: initial_stack,
                cards: [],
                in_hand: false,
                bet_amount: 0
            })
            newPlayer2.user = joinerId
            newGame.players.push(newPlayer2)


            return Promise.all([host.save(), joiner.save(), newGame.save()])
        })()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.startGame(gameId)
        expect(result).not.to.exist

        const retrievedGame = await Game.findById(gameId)
        expect(retrievedGame.status).to.equal('playing')
        expect(retrievedGame.hands.length).to.equal(1)
        expect(retrievedGame.hands[0].pot).to.equal(0)
        expect(retrievedGame.hands[0].dealer_pos).to.equal(0)
        expect(retrievedGame.hands[0].bb_pos).to.equal(1)
        expect(retrievedGame.hands[0].sb_pos).to.equal(0)
        expect(retrievedGame.hands[0].turn_pos).to.equal(1)
        expect(retrievedGame.hands[0].used_cards.length).to.equal(7)
        expect(retrievedGame.hands[0].table_cards.length).to.equal(3)
        expect(retrievedGame.players[0].in_hand).to.equal(true)
        expect(retrievedGame.players[1].in_hand).to.equal(true)
        expect(retrievedGame.players[0].cards.length).to.equal(2)
        expect(retrievedGame.players[1].cards.length).to.equal(2)
    })

    it('should fail if game does not exist', async () => {

        await Game.deleteMany()

        try {
            await logic.startGame(gameId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('Game does not exist.')
        }
    })


    it('should fail on empty Game ID', () => {
        expect(() =>
            logic.startGame('')
        ).to.throw(Error, 'Game ID is empty or blank')
    })

    it('should fail on undefined Game ID', () => {
        expect(() =>
            logic.startGame(undefined)
        ).to.throw(Error, `Game ID with value undefined is not a valid ObjectId`)
    })

    it('should fail on non-valid data type for Game ID', () => {
        expect(() =>
            logic.startGame('aaaa')
        ).to.throw(Error, `Game ID with value aaaa is not a valid ObjectId`)
    })

    after(() => mongoose.disconnect())
})