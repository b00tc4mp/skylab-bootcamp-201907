// FUNCTION => showWheel()
// PARAM => ()
// RETURN => htmlString: letters divs 
let showWheel = () => {
    let htmlString = '';
    let code= 97;
    for(let i=0; i<26 ; i++){
        let char = String.fromCharCode(code);
        htmlString += `<div id='${i}' class='letter-wheel'>${char.toUpperCase()}</div>`;
        code++;
    }
    return htmlString;
};

$(document).ready(function(){

    // start game button
    $('#start-game-btn').click(function(){
        startGame();
    }) 
    
    // ok button
    $("#check").click(function(){
        if(game){ getWord() };
    });

    // next word button
    $('#next-word').click(function(){
        if(game){ nextWord() }
    })

    // resume button
    $('#resume-game').click(function(){
        startGame();
    })
    
    // end button
   $('#end-game').click(function(){
       if(game){
        //    indexQuestionsArray.length = 0;
           $('#exit-score').html(endGame(players)); 
           game = false;
       }
   })
})