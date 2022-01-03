const $gameboard = $("#gameboard");
const $rows = $(".row");
const $cells = $(".cell");
const $reset = $('#reset')

let pauseGame = false;
let playerOne = "X";
let playerTwo = "O";
let playerTurn = true;

let turns = 0

let winnersTable = [
    [$cells[0], $cells[1], $cells[2]],
    [$cells[3], $cells[4], $cells[5]],
    [$cells[6], $cells[7], $cells[8]],
    [$cells[0], $cells[3], $cells[6]],
    [$cells[1], $cells[4], $cells[7]],
    [$cells[2], $cells[5], $cells[8]],
    [$cells[0], $cells[4], $cells[8]],
    [$cells[2], $cells[4], $cells[6]],
];

let cellCount = 0;

function checkWin(player) {
    turns++
    if(turns > 4) {
        for (let i = 0; i < winnersTable.length; i++) {
            for (let j = 0; j < winnersTable[i].length; j++) {
                if (winnersTable[i][j].textContent === player) {
                    cellCount++
                    if (cellCount === 3) {
                        playerWins(winnersTable[i])
                        return true;
                    }
                }
            }
            cellCount = 0;
        }
    }
    if (turns === 9) {
        draw()
    }
    return false;
}

function selectCell(player, cell) {
    if(cell.textContent !== '') {
        cell.animate({
            backgroundColor: '#131c5a',
        }, 100);
        return false;;
    } else {
        cell.textContent = player;
        if(checkWin(player)) {
            console.log(`${player} Wins!`)
        }
        return true;
    }
}

let target;
let cell;

console.log(pauseGame)
$rows.click(function (e) {
        if (!pauseGame) {
        target = $cells.index(e.target);
        cell = $cells[target]

        if (playerTurn) {
            if(selectCell(playerOne, cell)) {
                playerTurn = false;
            }
        } else {
            if(selectCell(playerTwo, cell)) {
                playerTurn = true;
            }
        }
    }
});

let i = 0;
function playerWins(cells) {
    pauseGame = true;
    let timer = setInterval(() => {
        cells[i].animate({
            backgroundColor: '#d1439e',
            fontSize: '3em'
        }, 200);
        i++;
        if(i === 3) {
            i = 0;
            clearInterval(timer);
            return true;
        }
    }, 200);
}

let curr = 0
function draw() {
    let timer = setInterval(() => {
        $rows[curr].animate({
            backgroundColor: '#1da5be'}, 1800);
        curr++
        if(curr === 3) {
            curr = 0;
            clearInterval(timer);
            return true;
        }
    }, 600);
}

function reset() {
    pauseGame = false;
    console.log(pauseGame)
    turns = 0;
    playerTurn = true;
    let timer = setInterval(() => {
        $cells[curr].animate({
            backgroundColor: '#1da5be'}, 100);
        $cells[curr].textContent = ''
        curr++
        if(curr === 9) {
            curr = 0;
            clearInterval(timer);
            return true;
        }
    }, 100);
}

$reset.click(function() {
    reset();
})

// ------ ROTATING BOARD -------
let degrees = 0;
let rotate = setInterval(() => {
    if (degrees < 360) {
        degrees += 1
        $gameboard.css({
            'transform': `rotate(${degrees}deg)`
        })
    } else {
        degrees = 0;
    }
}, 100);


// ------ TEXT ANIMATION ------
const $tic = $('#tic');
const $tac = $('#tac');
const $toe = $('#toe');

setInterval(() => {
    $tic.animate({
        fontSize: '1.2em'
    }, 800);

    $tic.animate({
        fontSize: '.8em'
    }, 1800);
}, 100)

setInterval(() => {
    $tac.animate({
        fontSize: '1.2em'
    }, 1100);

    $tac.animate({
        fontSize: '.8em'
    }, 2000);
}, 200)

setInterval(() => {
    $toe.animate({
        fontSize: '1.2em'
    }, 1400);

    $toe.animate({
        fontSize: '.8em'
    }, 2200);
}, 200)


$piece = $('#piece');
$status = $('#status')
setInterval(() => {
    $status.animate({
        fontSize: '5em',
        letterSpacing: '0'
    }, 1100);
    $status.animate({
        fontSize: '4em',
        letterSpacing: '0'
    }, 1100);
    $piece.animate({
        fontSize: '10em',
    }, 1100);
    $piece.animate({
        fontSize: '8em',
    }, 1100);
}, 200)
