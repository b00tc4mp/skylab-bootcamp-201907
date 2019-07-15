// let setupTimer = () => {
//     counter--;
//     $('#timer').text(counter);
//     // if(counter<145){
//     //     clearInterval(setupTimer);
//     // };
// }; 

// FUNCTION => setQuestionText()
// PARAM => idxLetter: number       => setIndexes()
// PARAM => idxQuestion: number     => setIndexes()
// RETURN => question referring to the index position of 'questions' object array => called by #next-word button
let setQuestionText = (idxLetter , idxQuestion) => {
    $('#answer').val('');
    $('#quest').text(questions[idxLetter].letterQuest[idxQuestion].question);
};


// FUNCTION => getAnswerWord()
// PARAM => idx: number
// RETURN => answer word referring to the index position of 'questions' object array => called by #check button
let getAnswerWord = (idxLetter , idxQuestion) => {
    return (questions[idxLetter].letterQuest[idxQuestion].answer);
}


// FUNCTION => setScoreMarker()
// PARAM => score: number
// PARAM => errors: number
// ACTION       ==> sets #scoreMarker div (#score and #errors)
//              ==> called by checkAnswer()
let setScoreMarker = (score , errors) => {
    $('#score').text(score);
    $('#errors').text(errors);
    // $('#score').text('Aciertos: ' + score);
    // $('#errors').text('Errores: ' + errors);
}


// FUNCTION => setIndexes()
// ACTION       ==> sets idxLetters
//              ==> set idxQuestion (checks value = 0);
//              ==> called by checkAnswer()
let setIndexes = () => {    
    //letter index flow
    currentIndex = idxLetter+1; 
    if(currentIndex > totalQuestions-1){
        currentIndex = 0;
    }

    while(questions[currentIndex].status === 1){
        currentIndex++;
        if(currentIndex > totalQuestions-1){
            currentIndex = 0;
        }
    };
    idxLetter = currentIndex;

    //question index flow
    nextWordRound = (attempts > totalQuestions-1) ? true : false;       //set nextRound to 'true' if one round is completed

    if(nextWordRound === false){                                        
        let idx = Math.floor(Math.random() * 3);
        while(questions[idxLetter].letterQuest[idx].status === 1){
            idx = Math.floor(Math.random() * 3);
        };
        idxQuestion = idx;
        indexQuestionsArray.push(idxQuestion);                          //push index question => retrieve when nextWordRound = true
    }else{
        idxQuestion = indexQuestionsArray[idxLetter];
    }   
};


// FUNCTION => setStatusLetter()
// ACTION       ==> sets status question to '1' ===> only avalilable if status === 0
//              ==> called by checkAnswer()
let setStatusLetter = (idxLetter) => {
    questions[idxLetter].status = 1;
};


// FUNCTION => resetStatusLetter()
// ACTION       ==> sets status question to '0'
//              ==> called by startGame()
let resetStatusLetter = (arrayQuestions) => {
    for(let i=0 ; i<arrayQuestions.length ; i++){
        questions[i].status = 0;
    };
};


// FUNCTION => setStatusQuestion()
// ACTION       ==> sets status question to '1' ===> only avalilable if status === 0
//              ==> called by checkAnswer()
let setStatusQuestion = (idxLetter , idxQuestion) => {
    questions[idxLetter].letterQuest[idxQuestion].status = 1;
};


// FUNCTION => resetStatusQuestion()
// ACTION       ==> sets status question to '0'
//              ==> called by startGame()
let resetStatusQuestion = (arrayQuestions) => {
    for(let i=0 ; i<arrayQuestions.length ; i++){
        for(let j = 0 ; j<arrayQuestions[i].letterQuest.length ; j++){
            questions[i].letterQuest[j].status = 0;
        }
    };
};


// FUNCTION => saveGameScore()
// ACTION       ==> saves score , errors and attemps for each game in gameScore array
//              ==> called by checkAnswer()
let saveGameScore = (player , score , errors , attempts) => {
    gameScore.push({player: player , score: score , errors: errors , attempts: attempts});
};


// FUNCTION => resumeGameScore())
// RETURN => text string => called by getWord()
let resumeGameScore = (scoreArray) => {
    let orderedArray = scoreArray.sort(function(a,b){return b.score - a.score});
    let textString = '';
    for(let i = 0 ; i<orderedArray.length ; i++){
        textString += '<div class="resume-score">';
        textString += `<span>Jugador #${orderedArray[i].player}</span><br/>`;
        textString += `Aciertos: ${orderedArray[i].score} || Errores: ${orderedArray[i].errors} || Intentos: ${orderedArray[i].attempts}`;
        textString += '</div>';
    }
    return textString;
};


// FUNCTION => endGameScore())
// RETURN => text string => called by viwe::end-game button
let endGame = (player) => {
    $('#game-form').hide();
    $('#exit').show();
    let i = player-1
    saveGameScore(player , score , errors , attempts);
    let textString = '<div>';
        textString += `<span>Jugador #${gameScore[i].player}</span><br/>`;
        textString += `Aciertos: ${gameScore[i].score} || Errores: ${gameScore[i].errors} || Intentos: ${gameScore[i].attempts}</`;
        textString += '</div>';
    return textString;
};


// FUNCTION => checkAnswer()
// PARAM => inputWord: string => word inserted by player
// PARAM => answerWord: string => word kept in array object
// ACTION => if true
//          ==> sets scoreMarker (points && errors)
//          ==> sets indexes (idxLetter && idxQuestion)
//          ==> sets status letter
//          ==> sets status question
//          ==> called by #check button 
let checkAnswer = (inputWord , answerWord) => {
    if(inputWord.toLowerCase() === answerWord){
        score++;
        document.getElementById(idxLetter).style.color = '#0E6655';
        document.getElementById(idxLetter).style.backgroundColor = '#A2D9CE';
        document.getElementById(idxLetter).style.border = "5px solid #148F77";
    }else{
        errors++;
        document.getElementById(idxLetter).style.color = '#7B241C';
        document.getElementById(idxLetter).style.backgroundColor = '#E6B0AA';
        document.getElementById(idxLetter).style.border = "5px solid #C0392B";
    };
    attempts++;
    setScoreMarker(score , errors);
    setStatusLetter(idxLetter);
    setStatusQuestion(idxLetter , idxQuestion);

    if((score + errors) === totalQuestions){
        saveGameScore(players , score , errors , attempts);
        $('#game-form').hide();
        $('#resume').show();
        $('#resume-score').html(resumeGameScore(gameScore));
        game = false;
    }else{
        setIndexes(); 
    }
    // setIndexes();
};


// FUNCTION => getWord()
// ACTION => if true
//          ==> gets input word
//          ==> gets correct answer for each question 
//          ==> checks answer
//          ==> sets #quest text
let getWord = () => {
        $('#answer').focus();
        let inputWord = $('#answer').val();
        let answerWord = getAnswerWord(idxLetter , idxQuestion);
        checkAnswer(inputWord , answerWord);
        setQuestionText(idxLetter , idxQuestion);
};


// FUNCTION => nextWord()
// ACTION => if true
//          ==> sets attempts
//          ==> sets letter wheel bg-color 
//          ==> sets indexes
//          ==> sets #quest text
let nextWord = () => {
    attempts++;
    document.getElementById(idxLetter).style.color = '#F39C12';
    document.getElementById(idxLetter).style.border = '5px solid #F1C40F';
    document.getElementById(idxLetter).style.backgroundColor = '#FCF3CF';
    $('#answer').focus();
    setStatusQuestion(idxLetter , idxQuestion);
    setIndexes();
    setQuestionText(idxLetter , idxQuestion);
};



// FUNCTION => startGame()
// ACTION => if true
//          ==> sets question text(idxLetter && idxQuestion);
//          ==> sets score marker (score && errors)
//          ==> pushes index question into indexQuestionArray
//          ==> hides intro section
//          ==> shows canvas section
//          ==> sets #quest text
//          ==> called by #start button
let startGame = () => {
    players++;
    if(players%3 == 0){
        resetStatusQuestion(questions);

    }
    let counter = 100;                                  //timer
    game = true;
    attempts = 0; 
    score = 0;                                      
    errors = 0;
    idxLetter = -1;
    nextWordRound = false;                          
    currentIndex = 0;
    indexQuestionsArray.length = 0;

    resetStatusLetter(questions);                       //sets status letter to 0;

    setIndexes();

    setQuestionText(idxLetter , idxQuestion);
    setScoreMarker(score , errors);
    
    $('#intro').hide();
    $('#resume').hide();
    $('#exit').hide();
    $('#canvas').show();
    $('#wheel').html(showWheel());
    $('#game-form').show();

    $('#quest').text(setQuestionText(idxLetter , idxQuestion));
    $('#answer').focus();
        
    $('#timer').text(counter);

    let seconds = setInterval(function(){
        counter--;
        $('#timer').text(counter);
        if(counter <= 0 || game === false){
            clearInterval(seconds);
            if(counter <= 0){
                game = false;
                saveGameScore(players , score , errors , attempts);
                $('#game-form').hide();
                $('#resume').show();
                $('#resume-score').html(resumeGameScore(gameScore));
            }
            
        };
    },1000);
};



