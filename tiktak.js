
document.addEventListener('DOMContentLoaded', function(event) {
// window.addEventListener('DOMContentLoaded', (event)=> {//why is event needed? its an arrow function
const squares = Array.from(document.querySelectorAll('.square'));//all should place them in an array
console.log(squares);
const display = document.querySelector('.dislplay');
const restartButton = document.querySelector('.restart');
const gameBoard = document.querySelector('.GameBoard');// not sure i need this

// indent so its easier to read


const playerOne = "X", playerTwo = "O";

const gameBoardArray = ['','','','','','','','','']; // the nine spaces on board to be filled when moves are made
let isGameActive  =true;
let currentPlayer = playerOne//write function to change this
const playerOneWon = "Player One won!!!";
const playerTwoWon = "Player Two won!!!";
const tie = 'its a Draw'; 
// function markX() {
//     return restartButton.innerText ='X'}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 6],
    [2, 4, 6]
 ]; //array of arrays containg winning indice positions
 

 function handleResultValidation() {
     let roundWon =false;
     for (let i =0; i  <= 7; i++){
         const winCondition = winningCombinations[i]; //iterate through winning options
         const a = gameBoard[winCondition[0]];// condition can now be suplemented for combination
         const b = gameBoard[winCondition[1]];
         const c = gameBoard[winCondition[2]];
         if (a === '' || b=== '' || c===''){
             continue;// skips if tile is empty
         }
         if ( a === b && b === c ) {
             roundWon = true;
             break; 
         }
        }
        if (roundWon) {
            display( currentPlayer === 'X' ? playerOneWon : playerTwoWon);
            isGameActive = false;
            return;// if we have a winner
        }
        if (!gameBoard.includes(''))
           display(tie); //if we have no winner and no epmty space
        };

    isValidAction = (square) => {
        if ( square.innerText === 'X'|| square.innerText === 'O'){
            return false;//populted squares cant be clicked
        }
        return true;
    };
const updateBoard = (index)=> {
    gameBoard[index]= currentPlayer;
}
         

 
 const endGameStatements = (type) => {
     switch(type){
         case playerOneWon: 
         display.innerHTML= playerOneWon ;
            break; //terminates current loop
         case playerTwoWon:
             display.innerHTML = playerTwoWon ;
             break;
         case tie :
             display.innerHTML = tie;
     } 
    };
endGameStatements();
 const changePlayer = () => { 
     display.classList.remove(`player${currentPlayer}`);//shortcut to concatenate and pull in current player?
     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
     display.innerText= currentPlayer;//ask max about this
     display.classList.add(`player${currentPlayer}`);
 }
 const userAction = (square, index) =>{ 
     if( isValidAction (square) && isGameActive) {
         square.innerText = currentPlayer;
         square.classList.add(`player${currentPlayer}`);// shouldnt need conditonal to determine player turn
         updateBoard(index);
         handleResultValidation();// youtube reference
         changePlayer();
     }
 }
//function for clicking on a square
squares.forEach((square, index)=>{square.addEventListener('click', () => userAction(square, index));
});
const resetgameBoard =() => { 
    gameBoardArray = ['','','','','','','','',''];
    isGameActive = true;
     if ( currentPlayer === 'O'){
         changePlayer();
     }
     squares.forEach(square => {
    square.innerText = '';
    square.classList.remove('playerOne');
    square.classList.remove('playerTwo');
});
}
restartButton.addEventListener('click', resetgameBoard()) //make this function later
});