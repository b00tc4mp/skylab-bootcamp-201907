let bingo = () => {
    // param => str: prompt string
    // return => player name
    let getPlayerName = (str) => {
        if(str.length === 0){
            str = prompt('Insert your name, please');
        }
        return str;
    }

    // param => array: array of avalaible numbers for randoming
    // param => arrayControl: array of random control
    // return => random number for play round
    let getRandomRoundNumber = (arrayRandomNumbers , arrayControlRandomNumbers) => {
        let rnd = Math.floor(Math.random() * arrayRandomNumbers.length);
        while(arrayControlRandomNumbers[rnd] === 0){
            rnd = Math.floor(Math.random()*arrayRandomNumbers.length);
        };
        arrayControlRandomNumbers[rnd] = 0;
        return arrayRandomNumbers[rnd];
    };

    // param => limit: number
    // return => random number for getting card
    let getRandomCardNumber = (limit) => {
        let rnd = Math.floor(Math.random() * limit);
        return rnd;
    };

    // param => limit: number
    // return => array of avalaible numbers for game
    let getArrayNumbers = (limit) => {
        let arrayNumbers = new Array(limit);
        for(let i=0 ; i<limit ; i++){
            arrayNumbers[i] = i+1;
        }
        return arrayNumbers;
    };

    // param => array: array of avalaible numbers for game
    // return => card game 
    let getCard = (array) => {
        let card = new Array(3);
        for(let i=0 ; i<card.length ; i++){
            let row = new Array(5)
            for(let j=0 ; j<row.length ; j++){
                let rnd = getRandomCardNumber(array.length);
                do{
                    rnd = getRandomCardNumber(array.length);
                }while(array[rnd] === 0);
                row[j] = array[rnd];
                array[rnd]=0;
            }
            card[i] = row;
        }
        return card;
    }

    // param => string: user name by prompt
    // param => card: bidimensional array
    // action => print card
    let showCard = (card) => {
        let cardString = `=== PLAYER => ${userName}\n`;
        cardString += `=== GAME => ${numGame}\n`;
        cardString += `=== CARD => ${numCard}\n`;
        cardString += `=== ROUND => ${numRound}\n`;
        cardString += `=== MATCHES => ${matches}\n`;
        cardString += `=== POINTS => ${points}\n`;
        for(let i=0 ; i<card.length ; i++){
            cardString += '------------------------------\n';
            for(let j=0 ; j<card[i].length ; j++){
                cardString += `| ${card[i][j]} |`;
            }
            cardString += '\n------------------------------\n';
        }
        console.log(cardString);
    }

    // param => rndNumber: random number
    // param => currentCard: current card
    // return => currentCard: check matches between random number and numbers in current card [match changes number into 'X']
    let checkCard = (rndNumber , currentCard) => {
        for(let i= 0 ; i<currentCard.length ; i++){
            for(let j = 0 ; j<currentCard[i].length ; j++){
                if(currentCard[i][j] === rndNumber){
                    matches++;
                    points+=2;
                    currentCard[i][j] = 'X';
                }
            }
        }
        return currentCard;
    };


    // param => currentCard: current card
    // action => if value position = 'X then increases counter value
    // action => if counter = 5 then alert then flag=flase
    let checkRow = (currentCard) => {
        for(let i = 0 ; i<currentCard.length ; i++){
            let counter = 0;
            for(let j = 0 ; j<currentCard[i].length ; j++){
                if(currentCard[i][j]=== 'X'){
                    counter++;
                }
            }
            if(counter===5){
                points += 15;
                alertRow = false;
                return (alert('Row'));
            }
        }
    }

    let ranking = (users) => {
        let userString = 'The following users have played this game:\n';
        let winnerName = 'The winner is';
        let tierNames = 'Tie! These are the winners:';
        let tie = false;
        let topRounds = 0;
        for (let i=0 ; i<users.length ; i++){
            userString += `Name: ${users[i].name} || Rounds => ${users[i].rounds}\n`;
            if(users[i].rounds>topRounds || users[i].rounds === topRounds ){
                topRounds = users[i].rounds;
                if(users[i].rounds>topRounds){
                    winnerName += users[i].name;
                }
                else{
                    tie = true;
                    tierNames += `|${users[i].name}|`;
                }
            }
        }
        console.log(userString);
        let winMsg = tie ? tierNames : winnerName ;
        console.log(winMsg);
    };

    // param => currentCard: current card
    // action => game flow
    let newRound = (currentCard) => {
            while(game){
                if(matches<15){
                    let promptString = numRound === 0 ? 'Start the game? y/n' : 'Keep playing? y/n';
                    let choice = prompt(promptString);
                    switch(choice){
                        case 'y':
                            numRound++;
                            let rnd = getRandomRoundNumber(arrayRandomNumbers , arrayControlRandomNumbers);
                            currentCard = checkCard(rnd , currentCard);
                            console.log(`***** Current random number => ${rnd} *****\n`);
                            showCard(currentCard);
                            if(alertRow){checkRow(currentCard)};
                            break;
                        
                        case 'n':
                            alert('Thanks for coming. See u soon!');
                            game = false;
                            break;

                        case null:
                            alert('Thanks for coming. See u soon!');
                            game = false;
                            break;

                        default:
                            alert('Wrong option. Insert y/n');
                        break;
                    }
                }
                else{
                    points += 30;
                    users.push({ name: `${userName}`, rounds: numRound});
                    alert(`***********BINGO***********\nCongratulations ${userName}\n***RANKING***\nTotal rounds => ${numRound}\nTotal points => ${points}`);
                    game = false;
                    let playAgain = prompt('Do you want to play again? y/n');
                    if(playAgain === 'y'){
                        console.clear();
                        numGame++;
                        bingo();
                    }
                    else{
                        ranking(users);
                        alert('Thanks for coming. See u soon!');
                    }
                }
            }
    }



    // MAIN
        let limitNumbers = 20;
        let arrayNumbers = getArrayNumbers(limitNumbers);                 //array with avalaible numbers for getting card
        let arrayRandomNumbers = getArrayNumbers(limitNumbers);           //array with avalaible numbers for extracting random number
        let arrayControlRandomNumbers = getArrayNumbers(limitNumbers);    //array with avalaible numbers for controlling random number
        let currentCard = getCard(arrayNumbers);
        let numCard = 1;
        let numRound = 0;
        let matches = 0;
        let points = 0;
        let alertRow = true;
        let game = true;
        let userName = getPlayerName(prompt('Insert your name, please'));

        showCard(currentCard);
        
        let resetCard = prompt(`Hello ${userName}! Would you like to reset the card? y/n`);
        
        while(resetCard === 'y'){
            numCard++;
            let arrayNumbers = getArrayNumbers(limitNumbers);
            let currentCard = getCard(arrayNumbers);
            console.log(`====== CARD #${numCard} ======`);
            showCard(currentCard);
            resetCard = prompt(`This is the new card. Would you like to reset the card? y/n`);
            // newRound(currentCard);
        }
        
        if(resetCard === 'n'){
            newRound(currentCard);
        }
        else{
            alert('Thanks for coming. See u soon!');
        }
    }

    let users=[];
    let numGame = 1;
    bingo();
