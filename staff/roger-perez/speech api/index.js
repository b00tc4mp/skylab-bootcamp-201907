var message = document.querySelector('#message')
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

var grammer = '#JSGF V1.0;';
var recognition = new SpeechRecognition()
var SpeechRecognitionGrammerList = new SpeechGrammarList()

SpeechRecognitionGrammerList.addFromString(grammer,1);

recognition.grammars = SpeechRecognitionGrammerList;
recognition.lang = 'en-US';
recognition.interimResults = false;

// onresult
// onspeechend
// onerror

recognition.onresult = function(event){
    var last = event.results.length -1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';

    if(command.toLowerCase() === 'hello'){
        document.querySelector('#one').checked = true;
    }
    else if (command.toLowerCase() === 'bye'){
        document.querySelector('#two').checked = true;
    }
    else if (command.toLowerCase() === 'sunday'){
        document.querySelector('#three').checked = true;
    }
    else if (command.toLowerCase() === 'monster'){
        document.querySelector('#four').checked = true;
    }
}
recognition.onspeechend = function(){
    recognition.stop();
};
recognition.onerror = function(event){
    message.textContent = 'Error' + event.error;
}

document.querySelector('#giveCommand').addEventListener('click',function(){
    recognition.start();
})


