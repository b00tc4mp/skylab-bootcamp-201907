function bingo() {

    // Ask for number of tiles, generate card randomly and display it
    var tiles = prompt(`Please enter the number of tiles you want your bingo card to have:\n
                1. Minimum number of tiles is 10 (2 lines of 5).
                2. Maximum number of tiles is 90.
                3. Number of tiles entered will be rounded up until next multiple of 5.\n\n`);

    // Check tiles
    var tiles = tilesChecker(tiles)
    switch (tiles) {
        case 0:
            alert('See you next time!.');
            return;
        case 1:
            bingo();
            break;
        case 2:
            alert('Sorry, that is not a valid digit between 1 and 90. Please, try again.');
            bingo();
            break;
        case 3: 
            alert('Remember, the number of tiles must be a digit between 10 and 90. Please, try again.');
            bingo();
            break;
        default:
            break;
    }

    var bingoCard = cardGenerator(tiles);
    var board = displayCard(bingoCard);

    // Ask for card confirmation.
    var cardConfirmation = confirm(`Here's your randomly generated bingo card:\n\n${board}\n
    Accept to use this card or click cancel to generate a new one.\n\n`);
    if (!cardConfirmation) {
        bingo();
    } else {
        nextRound(tiles, bingoCard);
    }
}

function tilesChecker(tiles) {

    //Cancel button is pressed
    if (tiles === null) {
        return 0;
    }

    if (tiles === '') {
        return 1;
    }

    // Tiles entered is an integer
    if (!parseInt(tiles)) {
        return 2;
    }

    // Minimum number of tiles must be 10 (2 lines of 5)
    // Maximum number of tiles must be 75 ()
    if (tiles < 10 || tiles > 90) {
        return 3;
    }

    // Number of tiles must be whole multiple of 5. Otherwise, round up to next multiple of 5.
    if (tiles % 5 !== 0) {
        tiles = Math.ceil(tiles/5)*5;
    }
    return tiles;
}


function cardGenerator(tiles) {
/* Generate bingo card as larger as the number of tiles provided by the user */

    //Create card: array of lines (array of objects).
    card = [];

    // Add as many arrays to card as lines it must contain (5 numbers per line)
    lines = tiles / 5;
    for (i=0;i<lines;i++) {
        card.push([]);
    }

    for (i=1;i<=tiles;i++) {
        // Merge each line array of objects into one single object and map to extract array of numbers.
        var alreadyUsedNumbers = [].concat.apply([], card.map(function(line) {
            return line.map(function(numObject) {
                return numObject.number;
            })
        }))
        
        // Generate random number and add it to the card if it's not included yet.
        do {
            var randomNum = Math.ceil(Math.random()*tiles);
        } while (alreadyUsedNumbers.includes(randomNum));

        // If randomNum not used, create number object and push it into line array
        var lineNum = Math.ceil(i/5) - 1;
        var numObject = { number: randomNum, matched: false};
        card[lineNum].push(numObject);
    }
    return card;
}

function displayCard(bingoCard) {
/* Format board into a string-like grid */

    board = '';
    bingoCard.forEach(function(line, idx) {
    board += `| ${('0' + line[0].number).slice(-2)} | ${('0' + line[1].number).slice(-2)} | ${('0' + line[2].number).slice(-2)} | ${('0' + line[3].number).slice(-2)} | ${('0' + line[4].number).slice(-2)} |\n-----------------------------\n`
    });

    return board;

}

function nextRound(tiles, bingoCard) {
  
    alert('Game is starting...');

    // Generate array of random numbers between 1 and 100
    var spinnerNums = bingoSpinner();
    var matched = false;
    var matchStatus = {line: false, bingo: false};

    // Loop through spinner array of random numbers and match them against all the numbers in bingoCard object
    spinnerNums.some(function(nextNum, round) {
        bingoCard.some(function(line) {
            line.some(function(numObj) {
                if (numObj.number === nextNum) {
                    numObj.number = 'XX';
                    numObj.matched = true;
                    matched = true;
                    return matched;
                } else {
                    matched = false;
                }
                return matched;
            })
        return matched;
        })

        // If the spinner number matches a number in card, show congratulations message and check if line/bingo is completed. Otherwise, mismatch message
        if (matched) {
            alert(`Round: ${round+1}\n\nThe next number is... ${nextNum}!! Congratulations!\n\n${displayCard(bingoCard)}\n\n`);
            if (!matchStatus.line) checkLine(matchStatus, bingoCard);
            if (!matchStatus.bingo) checkBingo(round+1, matchStatus, bingoCard);
        } else {
            alert(`Round: ${round+1}\n\nThe next number is... ${nextNum}!! Almost there!\n\n${displayCard(bingoCard)}\n\n`);
        }

        // After bingo, ask for a new game. If not bingo yet, ask for next round
        if (matchStatus.bingo) {
            var newGame = confirm('Do you want to start a new game?\n\n');
            if (newGame) {
                bingo();
                return true;
            } else {
                alert('See you next time!.');
                return true;
            }
        } else {
            var keepPlaying = confirm('Do you want to keep playing?\n\n');
            if (!keepPlaying) {
                alert('See you next time!.');
                return true;
            }
        }
   })
}

function bingoSpinner() {
/* Create an array of random numbers from 1 to 100 that simulates Bingo Spinner extraction by turns */

    var shuffle = [];
    while (shuffle.length < 100) {
        var num = Math.floor(Math.random() * 100) + 1;
        if (shuffle.indexOf(num) === -1) {
            shuffle.push(num);
        }
    }
    return shuffle;
}

function calculateScore(sizeOfCard, rounds) {
    // The higher the size of bingo card, the more probable is calling bingo close to 100 rounds.
    // This algorithm guarantees smaller cards get fewer points per round
    // e.g. Card of 50 tiles, completed in 98 rounds = 10 points
    // e.g. Card of 10 tiles, completed in 98 rounds = 2 points
    return Math.round((((100-rounds)/100)*sizeOfCard)*10);
}

function checkLine(matchStatus, bingoCard) {
/* Check if a single line is completed in bingo card */
    
    var lineCompleted = bingoCard.some(function(line) {
        var isMatch = line.every(function(numObj) {
            return numObj.matched;
        })
        if (isMatch) return true;
    })

    if (lineCompleted) {
        matchStatus.line = true;
        alert('LINE COMPLETED!!');
    }
}

function checkBingo(rounds, matchStatus, bingoCard) {
/* Check if bingo card is completed with all numbers already matched */
    
    var bingoCompleted = bingoCard.every(function(line) {
        var isMatch = line.every(function(numObj) {
            return numObj.matched;
        })
        if (isMatch) return true;
    })

    if (bingoCompleted) {
        matchStatus.bingo = true;
        var sizeOfCard = bingoCard.length * 5;
        var finalScore = calculateScore(sizeOfCard, rounds);
        do {
            var username = prompt(`BINGO!!\n\nYou completed the game in ${rounds} rounds. Your score is: \n\nEnter your username for the ranking`);
            if (username === null) return false;
        } while (!username.trim().toString())
        
        updateShowRanking(username, finalScore);
    }
}

function updateShowRanking(username, finalScore) {
/* Update users and scores in ranking object */

    // If username is already in ranking, update score
    var match = rankings.some(function(entry) {
        if (entry.username.toLowerCase() === username.toLowerCase()) {
            entry.score += finalScore;
            return true;
        }
    })

    // Otherwise, add it to ranking
    if (!match) {
        rankings.push({username: username, score: finalScore});
    }

    // Sort rankings by score desc
    rankings.sort(function(a,b) {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
    })

    // Display it in order and assign position with idx
    rankingText = ``;
    rankings.forEach(function(entry, idx) {
        rankingText += `${idx+1}. ${entry.username}:  ${entry.score} points\n`;
    });
    alert(`Global Ranking:\n\n${rankingText}\n\n`);
};

rankings = []
bingo()