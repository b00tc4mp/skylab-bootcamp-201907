const { expect } = require('chai')
const logic = require('../../')
const { Instrument } = require('../../../data')
const { value } = require('../../../utils/random')
const mongoose = require('mongoose')

describe('logic - register instrument', () => {

    before(() => mongoose.connect('mongodb://localhost/goliath-api-test', { useNewUrlParser: true }))

    let name, style, audio

    beforeEach(() => {
        name = `name-${Math.random()}`
        style = value('rock',"electro",'jazz')
        audio = `audio-${Math.random()}`
     

       
        return Instrument.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerInstrument(name, style, audio)
            .then(result => {
                expect(result).not.to.exist

                return Instrument.findOne({ name })
            })
            .then(instrument => {
                expect(instrument).to.exist
                expect(instrument.name).to.equal(name)
                expect(instrument.style).to.equal(style)
                expect(instrument.audio).to.equal(audio)
            })
    )

    // name
    it('should fail on empty name', () => 
        expect(() => 
               logic.registerInstrument('', style, audio)
    ).to.throw('name is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
               logic.registerInstrument(undefined, style, audio)
    ).to.throw(`name with value undefined is not a string`)
    )

     it('should fail on wrong name data type', () => 
        expect(() => 
               logic.registerInstrument(123, style, audio)
    ).to.throw(`name with value 123 is not a string`)
    )

    // style
    it('should fail on empty style', () => 
        expect(() => 
               logic.registerInstrument(name, '', audio)
    ).to.throw('style is empty or blank')
    )

     it('should fail on undefined style', () => 
        expect(() => 
               logic.registerInstrument(name, undefined, audio)
    ).to.throw(`style with value undefined is not a string`)
    )

     it('should fail on wrong style data type', () => 
        expect(() => 
               logic.registerInstrument(name, 123, audio)
    ).to.throw(`style with value 123 is not a string`)
    )

   
    // audio
    it('should fail on empty audio', () => 
        expect(() => 
            logic.registerInstrument(name,style, '')
    ).to.throw('audio is empty or blank')
    )

     it('should fail on undefined audio', () => 
        expect(() => 
               logic.registerInstrument(name,style, undefined)
    ).to.throw(`audio with value undefined is not a string`)
    )

     it('should fail on wrong audio data type', () => 
        expect(() => 
               logic.registerInstrument(name, style, 123)
    ).to.throw(`audio with value 123 is not a string`)
    )

})
