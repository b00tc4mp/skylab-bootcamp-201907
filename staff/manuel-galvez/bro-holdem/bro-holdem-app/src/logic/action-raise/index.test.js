require('dotenv').config()
import logic from '..'
import { database, models } from 'bro-holdem-data'
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const { Game, User, Player, Hand, Card, Action } = models

const { random } = Math

describe('logic - action raise', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, maxPlayers, initialStack, initialBB, initialSB, blindsIncrease, hostId
    let username, email, password, repassword
    let token, hash, user, users = []
    let gameId, raiseTo

    beforeEach(async () => {
        name = `gameName - ${random()} `
        maxPlayers = `${(random() * 9).toFixed()}`
        initialStack = 1500
        initialBB = 50
        initialSB = 50
        blindsIncrease = `${(random() * (10 - 2) + 2).toFixed()}`

        await User.deleteMany()
        await Game.deleteMany()
        await Action.deleteMany()

        for (let i = 0; i < 2; i++) {
            username = `username - ${random()} `
            email = `email-${random()}@email.com`
            password = `pass-${random()} `
            repassword = password

            hash = await bcrypt.hash(password, 10)
            user = new User({ username, email, password: hash })
            users[i] = user
            await user.save()
        }

        token = jwt.sign({ sub: users[0].id }, REACT_APP_JWT_SECRET_TEST)
        logic.__token__ = token

        // Create new game
        const newGame = new Game({ name, maxPlayers, initialStack, initialBB, initialSB, blindsIncrease })
        gameId = newGame.id
        newGame.host = users[0].id

        let newPlayer
        for (let i = 0; i < 2; i++) {
            newPlayer = new Player({
                position: newGame.players.length,
                currentStack: initialStack,
                cards: [],
                inHand: false,
                betAmount: 0
            })
            newPlayer.user = users[i].id
            newGame.players.push(newPlayer)
        }

        // Emulate first hand deal (game start)
        const newHand = new Hand({
            pot: 0,
            dealerPos: 0,
            bbPos: newGame.players.length - 1,
            sbPos: newGame.players.length - 2,
            turnPos: 1,
            round: 0
        })

        newGame.status = 'playing'

        // Assign hands manually for testing purposes
        newHand.tableCards = [
            await Card.find({ ref: 'Ts' }),
            await Card.find({ ref: '6s' }),
            await Card.find({ ref: '5h' })
        ]

        // Players setup and dealing
        for (const player of newGame.players) {

            // Status
            player.inHand = true

            // Blinds assignment
            let isBlind, blindAmount, stackLeft
            if (player.position === newHand.bbPos) { isBlind = true; blindAmount = newGame.currentBB }
            if (player.position === newHand.sbPos) { isBlind = true; blindAmount = newGame.currentSB }
            if (isBlind) {
                stackLeft = player.currentStack - blindAmount
                if (stackLeft < 0) {
                    player.betAmount = player.currentStack
                    player.currentStack = 0
                } else if (stackLeft > 0) {
                    player.betAmount = blindAmount
                    player.currentStack = stackLeft
                }
                isBlind = false
            }
        }

        // Assign hands manually for testing purposes
        newGame.players[0].cards = [await Card.findOne({ ref: 'As' }), await Card.findOne({ ref: 'Ad' })]
        newGame.players[1].cards = [await Card.findOne({ ref: 'Ah' }), await Card.findOne({ ref: 'Kd' })]

        newHand.pot = newGame.currentBB + newGame.currentSB

        newHand.round = 0
        newHand.turnPos = 0

        newGame.hands.push(newHand)

        raiseTo = 300

        return await newGame.save()
    })

    it('should succeed on correct data', async () => {
        const response = await logic.actionRaise(gameId, raiseTo)
        expect(response).toBeUndefined()
        const retrievedGame = await Game.findById(gameId)
        const callPlayer = retrievedGame.players[0]
        const expectedPot = retrievedGame.players.reduce((acc, player) => acc + player.betAmount, 0)
        const highestBet = Math.max.apply(Math, retrievedGame.players.map(key => key.betAmount))
        const lastAction = await Action.find().sort({ _id: -1 }).limit(1)
        expect(retrievedGame.status).toBe('playing')
        expect(retrievedGame.hands[retrievedGame.hands.length - 1].pot).toBe(expectedPot)
        expect(callPlayer.betAmount).toBe(300)
        expect(callPlayer.currentStack).toBe(retrievedGame.initialStack - highestBet)
        expect(callPlayer.inHand).toBe(true)
        expect(lastAction).toBeDefined()
        expect(lastAction[0].player).toStrictEqual(callPlayer._id)
        expect(lastAction[0].hand).toStrictEqual(retrievedGame.hands[retrievedGame.hands.length - 1]._id)

    })

    it('should fail on incorrect token', async () => {
        logic.__token__ = '123'
        try {
            await logic.actionRaise(gameId, raiseTo)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('jwt malformed')

        }
    })

    it('should fail on incorrect gameId', async () => {
        let _gameId = '5d763e01f3dcf2635b7d495c'
        try {
            await logic.actionRaise(_gameId, raiseTo)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe('Game does not exist.')

        }
    })

    /* Game ID */
    it('should fail on empty name', () =>
        expect(() =>
            logic.actionRaise('', raiseTo)
        ).toThrow('Game ID is empty or blank')
    )


    it('should fail on undefined name', () =>
        expect(() =>
            logic.actionRaise(undefined, raiseTo)
        ).toThrow('Game ID with value undefined is not a valid ObjectId')
    )

    it('should fail on undefined name', () =>
        expect(() =>
            logic.actionRaise('123', raiseTo)
        ).toThrow('Game ID with value 123 is not a valid ObjectId')
    )

    afterAll(() => database.disconnect())
})