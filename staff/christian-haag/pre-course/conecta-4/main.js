

const Game = {
    imgur: [['src="chips/p1_1.png"', 'src="chips/p1_2.png"', 'src="chips/p1_3.png"', 'src="chips/p1_4.png"'], ['src="chips/p2_1.png"', 'src="chips/p2_2.png"', 'src="chips/p2_3.png"', 'src="chips/p2_4.png"']],
    score: {player1: 0, player2: 0, winner: false},
    _data: {
        _player: 'human',
        _bestOption: [null],
        _option: [null],
        _history: Array(42).fill(null),
        _status: false,
        _valueOfCell: [],
        _winnerLine: [],
        _lastCell: [],
        _columNum: [],
        _cols: [[],[],[],[],[],[],[]],
        
        get player(){ 
            return this._player;
        },

        get bestOption(){
            return this._bestOption;
        },
        get option(){
            return this._option;
        },

        get history(){ 
            return this._history;
        },
        
        get status(){ 
            return this._status; 
        },

        get valueOfCell(){ 
            return this._valueOfCell * 1;
        },

        get winnerLine(){
            return this._winnerLine;
         },

        get lastCell(){
            return this._lastCell;
        },

        get columNum(){
            return this._columNum;
        },
        get cols(){
            return this._cols;
        },

        set bestOption(computerIn){
            this._bestOption = computerIn;
        },
        set option(optionIn){
            this._option = optionIn;
        },

        set history(historyIn){
            this._history = historyIn;
        },
        set valueOfCell(cellValueIn){
            this._valueOfCell = cellValueIn;
        },

        set winnerLine(lineIn){
            this._winnerLine = lineIn;
        },

        set lastCell(lastCellIn){
            this._lastCell = lastCellIn;
        },

        set player(playerIn){ 
            this._player = playerIn; 
        },

        set status(statusIn){ 
            this._status = statusIn; 
        }, 
        set columNum(numIn){
            this._columNum = numIn;
        },

        set cols(chipIn){
            this._cols = chipIn;
        }
    },


    generateTable(rows,cols){
        let tableId = document.getElementById('table');
        let rowNum = 1;
        let cellValues = [0];
        
        for(let i = 0; i < rows; i++){
            tableId.innerHTML += `<tr id="${rowNum}"></tr>`;
            let tableRowId = document.getElementById(`${rowNum}`);
            for(let j = 0; j < cols; j++){
                tableRowId.innerHTML += `<td data-id="${cellValues[cellValues.length - 1]}"onClick="Game.replyClickId(this.getAttribute('value'))" id="tdId_${cellValues[cellValues.length - 1]}" value="${cellValues[cellValues.length - 1]}"><div class="chip" id="chip${cellValues[cellValues.length - 1]}"></div></td>`
                cellValues.push((cellValues.length - 1) + 1);
            }
            rowNum++;
        }
    },

    replyClickId(value){
        this._data.valueOfCell = value;
    },

    game(){
        let winner = this.checkWinner(this._data.history);
        let cell = this._data.lastCell;
        //et tableCellId = document.getElementById(`tdId_${cell}`)
        let chipId = document.getElementById(`chip${cell}`);
        let history = this._data.history;
        
        if(winner){
             return
        } else {
            if(this._data.status == false){

                if(history[cell] === 'P1' || history[cell] === 'P2'){
                    return

                } else {
                    chipId.innerHTML = `<img class="chipImg" ${Game.getRandomChip('P1', this.imgur[0])} width="100%" height="100%">`;
                    this._data.history.splice(this._data.lastCell, 1, 'P1');
                    this._data.status = !this._data.status;
                    this.checkWinner(this._data.history);
                    this.tie();
                    this.addScore(this.score.winner, history[this._data.winnerLine[0]]); 
                };

            } else {

                if(history[cell] === 'P1' || history[cell] === 'P2'){
                    return

                } else {
                chipId.innerHTML = `<img class="chipImg" ${Game.getRandomChip('P2', this.imgur[1])} width="100%" height="100%">`;
                this._data.history.splice(this._data.lastCell, 1, 'P2');
                this._data.status = !this._data.status;        
                this.checkWinner(this._data.history);
                this.tie();
                this.addScore(this.score.winner, history[this._data.winnerLine[0]]);     
                };
            };
        
        };
    },

    getRandomChip(player,array){
        let rand = Math.floor(Math.random()*array.length);
        if(player === 'P1'){
            return array[rand]; 
        }else if(player === 'P2'){
            return array[rand];
        }
    },
    
    highlightWinner(){
        let arr = this._data._winnerLine;
        let history = this._data.history;
        for(let i = 0; i < arr.length; i++){
            let chip = document.getElementById(`chip${arr[i]}`);
            setTimeout(function(){
                chip.classList.add('winner')  
            },i * 100); 
        }; 
        if(history[arr[0]] === 'P1'){
            document.getElementById('info-child-1').classList.add('info-winner');
            document.getElementById('info-child-2').style.borderLeft = 'none';
            document.getElementById('player1').style.color = '#ffff';
            document.getElementById('player1').innerHTML = 'GANADOR Jugador 1!';
            
             
        }else if(history[arr[0]] === 'P2'){
            if(this._data.player === 'robot'){
                document.getElementById('info-child-2').classList.add('info-winner');
                document.getElementById('info-child-1').style.borderLeft = 'none';
                document.getElementById('player2').style.color = '#ffff';
                document.getElementById('player2').innerHTML = 'GANADOR Robot!';
            } else {
                document.getElementById('info-child-2').classList.add('info-winner');
                document.getElementById('info-child-1').style.borderLeft = 'none';
                document.getElementById('player2').style.color = '#ffff';
                document.getElementById('player2').innerHTML = 'GANADOR Jugador 2!';
            };
        };
    },

    tie(){
        if(this._data.history.every(x => x !== null)){
            document.getElementById('info-child-1').classList.add('info-winner');
            document.getElementById('info-child-2').style.borderLeft = 'none';
            document.getElementById('player1').style.color = '#ffff';
            document.getElementById('player1').innerHTML = 'EMPATE!';
            document.getElementById('info-child-2').classList.add('info-winner');
            document.getElementById('info-child-1').style.borderLeft = 'none';
            document.getElementById('player2').style.color = '#ffff';
            document.getElementById('player2').innerHTML = 'EMPATE';
            
        }else{
            return
        }
    },

    addScore(bol, arg){
        if (bol === true){
            if (arg === 'P1'){
                this.score.player1++;
                document.getElementById('p1').innerHTML = this.score.player1;

            } else if (arg === 'P2'){
                this.score.player2++;
                document.getElementById('p2').innerHTML = this.score.player2;
            };

        } else {
            return
        }
    },

    setComputer(arr,info){
        arr.push(info);
    },

    checkWinner(cell){
        const lines = [
            //Horizontal
            [ 0, 1, 2, 3 ],[ 1, 2, 3, 4 ],[ 2, 3, 4, 5 ],[ 3, 4, 5, 6 ],
            [ 4, 5, 6, 7 ],[ 5, 6, 7, 8 ],[ 6, 7, 8, 9 ],[ 7, 8, 9, 10 ],
            [ 8, 9, 10, 11 ],[ 9, 10, 11, 12 ],[ 10, 11, 12, 13 ],[ 11, 12, 13, 14 ],
            [ 12, 13, 14, 15 ],[ 13, 14, 15, 16 ],[ 14, 15, 16, 17 ],[ 15, 16, 17, 18 ],
            [ 16, 17, 18, 19 ],[ 17, 18, 19, 20 ],[ 18, 19, 20, 21 ],[ 19, 20, 21, 22 ],
            [ 20, 21, 22, 23 ],[ 21, 22, 23, 24 ],[ 22, 23, 24, 25 ],[ 23, 24, 25, 26 ],
            [ 24, 25, 26, 27 ],[ 25, 26, 27, 28 ],[ 26, 27, 28, 29 ],[ 27, 28, 29, 30 ],
            [ 28, 29, 30, 31 ],[ 29, 30, 31, 32 ],[ 30, 31, 32, 33 ],[ 31, 32, 33, 34 ],
            [ 35, 36, 37, 38 ],[ 36, 37, 38, 39 ],[ 37, 38, 39, 40 ],[ 38, 39, 40, 41 ],
            //vertical
            [ 0, 7, 14, 21 ],[ 7, 14, 21, 28 ],[ 14, 21, 28, 35 ],
            [ 1, 8, 15, 22 ],[ 8, 15, 22, 29 ],[ 15, 22, 29, 36 ],
            [ 2, 9, 16, 23 ],[ 9, 16, 23, 30 ],[ 16, 23, 30, 37 ],
            [ 3, 10, 17, 24 ],[ 10, 17, 24, 31 ],[ 17, 24, 31, 38 ],
            [ 4, 11, 18, 25 ],[ 11, 18, 25, 32 ],[ 18, 25, 32, 39 ],
            [ 5, 12, 19, 26 ],[ 12, 19, 26, 33 ],[ 19, 26, 33, 40 ],
            [ 6, 13, 20, 27 ],[ 13, 20, 27, 34 ],[ 20, 27, 34, 41 ],
            //diagonal[\]
            [ 14, 22, 30 , 38],
            [ 17, 15, 23, 31 ],[ 15, 23, 31, 39 ],
            [ 0, 8, 16, 24 ],[ 8, 16, 24, 32 ],[ 16, 24, 32, 40 ],
            [ 1, 9, 17, 25 ],[ 9, 17, 25, 33 ],[ 17, 25, 33, 41 ],
            [ 2, 10, 18, 26 ],[ 10, 18, 26, 34 ],
            [ 3, 11, 19, 27 ],
            //diagonal[/]
            [ 20, 26, 32, 38 ],
            [ 13, 19, 25, 31 ],[ 19, 25, 31, 37 ],
            [ 6, 12, 18, 24 ],[ 12, 18, 24, 30 ],[ 18, 24, 30, 36 ],
            [ 5, 11, 17, 23 ],[ 11, 17, 23, 29 ],[ 17, 23, 29, 35 ],
            [ 4, 10, 16, 22 ],[ 10, 16, 22, 28 ],
            [ 3, 9, 15, 21 ] 
            ];
       
        for(let i = 0; i < lines.length; i++){
            const [a,b,c,d] = lines[i];

            if (cell[d] && cell[d] === cell[c] && cell[d] === cell[b] && cell[a] === null) {
              this._data.bestOption = a;

            } else if(cell[a] && cell[a] === cell[b] && cell[a] === cell[c] && cell[d] === null ){
                this._data.bestOption = d;

            } else if(cell[a] && cell[a] === cell[b] && cell[a] === cell[d] && cell[c] === null ){
                this._data.bestOption = c;

            } else if(cell[a] && cell[a] === cell[c] && cell[a] === cell[d] && cell[b] === null ){
                this._data.bestOption = b;
            }
        }
        
        for(let i = 0; i < lines.length; i++){
            const [a,b,c,d] = lines[i];

             if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c] && cell[a] === cell[d]){
                this._data.winnerLine = lines[i];
                this.score.winner = true;
                this.highlightWinner();
                return   
            }         
        }
        return null;
    },

    setColumNumber(){
        const columns = [
            [ 0, 1, 2, 3, 4, 5, 6 ],
            [ 7, 8, 9, 10, 11, 12, 13 ],
            [ 14, 15, 16, 17, 18, 19, 20],
            [ 21, 22, 23, 24, 25, 26, 27 ],
            [ 28, 29, 30, 31, 32, 33, 34 ],
            [ 35, 36, 37, 38, 39, 40, 41 ]
        ];

        let cell = this._data.valueOfCell;

        for(let i = 0; i < columns.length; i++){
            const [a,b,c,d,e,f,g] = columns[i];
            if(cell === a){
                this._data.columNum = 0;
            }else if(cell === b){
                this._data.columNum = 1;
            }else if(cell === c){
                this._data.columNum = 2;
            }else if(cell === d){
                this._data.columNum = 3;
            }else if(cell === e){
                this._data.columNum = 4;
            }else if(cell === f){
                this._data.columNum = 5;
            }else if(cell === g){
                this._data.columNum = 6;
            }
        }
    },

    setColumns(){
        const columns = [
            [ 0, 1, 2, 3, 4, 5, 6 ],
            [ 7, 8, 9, 10, 11, 12, 13 ],
            [ 14, 15, 16, 17, 18, 19, 20],
            [ 21, 22, 23, 24, 25, 26, 27 ],
            [ 28, 29, 30, 31, 32, 33, 34 ],
            [ 35, 36, 37, 38, 39, 40, 41 ]
        ];
        let arr = this._data.cols
        for(let i = 0; i < columns.length; i++){
            const[a,b,c,d,e,f,g] = columns[i];
            arr[0].push([a].join('')*1);
            arr[1].push([b].join('')*1);
            arr[2].push([c].join('')*1);
            arr[3].push([d].join('')*1);
            arr[4].push([e].join('')*1);
            arr[5].push([f].join('')*1);
            arr[6].push([g].join('')*1);
        }
    },

    setChipPosition(column){
        let obj = this._data.cols[column][this._data.cols[column].length - 1];
        this._data.lastCell = obj;

        console.log(`Cell clicked: ${this._data.valueOfCell}\nColumn selected: ${this._data.columNum}\nChip position: ${this._data.lastCell}`);

        let remove = this._data.cols[column].splice(this._data.cols[column].length - 1, 1);
        this._data.bestOption = null;
    },

    
    robot(){   
        if (Game._data.player === 'robot' && Game._data.status === true){
            
            console.log('Best move: ' + this._data.bestOption);
            console.log('Option: ' + this._data.option);
            console.log('robot active');
            let cell = this._data.lastCell;
            let history = this._data.history; 
            
               
                if (this._data.bestOption !== null){ 
                    
                    if (history[(this._data.bestOption) + 7] === null && history[(this._data.bestOption) + 4] === null && history[(this._data.bestOption) + 11 ]!== null) {
                        console.log('Statement 0');
                        this._data.valueOfCell = history[(this._data.bestOption) + 4];

                    } else if (history[cell - 1] === 'P1' && history[cell - 2] === 'P1' && history[cell + 1] === null && history[cell + 8] !== null){
                        console.log('Statement 0.1');
                        this._data.valueOfCell = cell + 1;
   
                
                    } else if (history[cell + 1] === 'P1' && history[cell + 2] === 'P1' && history[cell - 1] === null && history[cell + 5] !== null){
                                console.log('Statement 0.2');
                                this._data.valueOfCell = cell - 1;
     
                            
                    } else if (history[(this._data.computer) + 14] === null){
                                console.log('Statement 0.3');
                                let p = [[this._data.computer + 1],[this._data.computer + 2], [this._data.computer + 3],[this._data.computer + 4]];
                                let r = Math.floor(Math.random() * p.length + 1);
                                this._data.valueOfCell = p[r];
                                      
                        
                    } else if (history[(this._data.computer + 7)] === null && history[(this._data.computer + 14)] !== null) {
                                console.log('Statement 0.4');
                                let pos = [[this._data.computer + 1],[this._data.computer + 2], [this._data.computer + 3],[this._data.computer + 4]];
                                let ran = Math.floor(Math.random() * pos.length + 1);
                                this._data.valueOfCell = pos[ran];
              
                    } else {
                            console.log('Statement 0.5');
                            this._data.valueOfCell = this._data.bestOption;       
                    };

                } else if (history[cell - 1] === null && history[cell + 1] === 'P2' || history[cell + 1] === 'P1'){
                            console.log('Statement 1.1');
                            let restOne =  cell - 1;
                            this._data.valueOfCell = restOne;
                    

                } else if (history[cell - 1] === 'P1' && history[cell + 1] === null || history[cell + 1] === 'P2'){
                            console.log('Statement 1.2');
                            let sumOne =  cell + 1;
                            this._data.valueOfCell = sumOne;
   
               
                } else if (history[cell-1] === 'P1' && history[cell + 1] === null && history[cell + 8] === null){
                            console.llog('Statement 1.3')
                            let p = [[cell + 2],[cell - 1]];
                            let r = Math.floor(Math.random()* position.length + 1);
                            this._data.valueOfCell = p[r];
                     
                
                } else if (history[cell + 1] === 'P1' && history[cell - 1] === null && history[cell + 6] === null){
                            console.llog('Statement 1.4');
                            let p = [[cell + 2],[cell - 1]];
                            let r = Math.floor(Math.random()* position.length + 1);
                            this._data.valueOfCell = p[r];
          

                } else if (history[cell - 1] === 'P2' && history[cell + 1] === null){
                            console.log('Statement 1.5');
                            let sumOne =  cell + 1;
                            this._data.valueOfCell = sumOne;
         
                } else if (history[cell + 1] === null && history[cell - 1] === null){
                            console.log('Statement 1.6');
                            let position = [[cell + 1],[cell - 1]];
                            let random = Math.floor(Math.random()* position.length);
                            this._data.valueOfCell = position[random];
           
                    
                };
                document.getElementById('info-child-1').style.borderLeft = '4px solid  #1541e9';
                document.getElementById('info-child-2').style.borderLeft = 'none';

            
        };

        this.setColumNumber();
        this.setChipPosition(this._data.columNum);
    },

    pc(){
        this._data.player = 'robot';
        document.getElementById('player2').innerHTML = 'Robot';
        console.log('player: ' + this._data.player);
    },

    newGame(){
        for(let i = 41; i >= 0 ; i--){
            document.getElementById(`chip${i}`).innerHTML = '';
            document.getElementById(`chip${i}`).classList.remove('winner');
           }
        this.score.winner = false;
        this._data.bestOption = [];
        this._data.history = Array(42).fill(null);
        this._data.status =  false;
        this._data.winnerLine = [];
        this._data.lastCell = [];
        this._data.columNum = []; 
        this.setColumns()
        document.getElementById('info-child-1').style.borderLeft = '4px solid  #1541e9';
        document.getElementById('info-child-2').style.borderLeft = 'none';
        document.getElementById('info-child-1').classList.remove('info-winner');
        document.getElementById('info-child-2').classList.remove('info-winner');
        document.getElementById('player1').innerHTML = '';
        document.getElementById('player1').innerHTML = 'Jugador 1';
        document.getElementById('player1').style.color = '#1541e9';

        if(this._data.player !== 'robot'){
            document.getElementById('player2').innerHTML = '';
            document.getElementById('player2').innerHTML = 'Jugador 2';
            document.getElementById('player2').style.color = '#1541e9';
        } else {
            document.getElementById('player2').innerHTML = '';
            document.getElementById('player2').innerHTML = 'Robot';
            document.getElementById('player2').style.color = '#1541e9';
        }
        
    }
    
};



(function(){
    Game.generateTable(6,7);
    Game.setColumns();
})();



document.getElementById('table').addEventListener('click', function(){

    playerTurn();

    if(Game.score.winner === false && ((Game._data.player === 'human' && Game._data.status === true || Game._data.status === false) || (Game._data.player === 'robot' && Game._data.status === false))){ 
        let cell = Game._data.lastCell;
        let history = Game._data.history;

            Game.setColumNumber(); 
    
            if (history[cell] !== 'P1' || history[cell] !== 'P2'){
                    Game.setChipPosition(Game._data.columNum);
                    Game.game();
                    if (Game.score.winner === false && Game._data.player === 'robot'){
                            setTimeout(function(){
                                Game.robot();
                                Game.game();    
                            },1500);
                    };
            };
    } else {
        return false;
    };   
});


function playerTurn(){
    let player1 = document.getElementById('info-child-1');
    let player2 = document.getElementById('info-child-2');

        if (Game._data.status === false){ 
                player2.style.borderLeft = '4px solid  #1541e9';
                player1.style.borderLeft = 'none';

        } else {  
            player1.style.borderLeft = '4px solid  #1541e9';
            player2.style.borderLeft = 'none';
        };
};

let toggle = false;


document.getElementById('robot').addEventListener('click', function(){
   
    let bttn = document.getElementById('robot');
    if(toggle == false){
       bttn.classList.add('robot_focus');
       toggle = true;
    }else{
        bttn.classList.remove('robot_focus');
        Game._data.player = 'human';
        document.getElementById('player2').innerHTML = 'Jugador 2';
        toggle = false;
        console.log('player: ' + Game._data.player);
    }
})



