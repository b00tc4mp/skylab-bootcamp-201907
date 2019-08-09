/**
 * Plays a joke using a synthesizer
 *
 * @param {String} joke id.
 */

logic.synth = (value) => {
    let utterance = new SpeechSynthesisUtterance(value.toString())
    utterance.lang = 'en-US'
    speechSynthesis.speak(utterance)
}