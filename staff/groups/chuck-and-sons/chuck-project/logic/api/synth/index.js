logic.synth = (value) => {
    let utterance = new SpeechSynthesisUtterance(value)
    utterance.lang = 'en-US'
    speechSynthesis.speak(utterance)
}