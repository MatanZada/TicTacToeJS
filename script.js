
var N_SIZE = 3,
EMPTY = "&nbsp;",
boxes = [],
turn = "X",
score,
moves;


//  מאתחל ומתחיל במשחק.
// Initializes and starts the game.
function init() {
let board = document.createElement('table');
board.setAttribute("border", 1);
board.setAttribute("cellspacing", 0);

let identifier = 1;
for (let i = 0; i < N_SIZE; i++) {
    let row = document.createElement('tr');
    board.appendChild(row);
    for (let j = 0; j < N_SIZE; j++) {
let cell = document.createElement('td');
cell.setAttribute('height', 120);
cell.setAttribute('width', 120);
cell.setAttribute('align', 'center');
cell.setAttribute('valign', 'center');
        cell.classList.add('col' + j,'row' + i);
        if (i == j) {
            cell.classList.add('diagonal0');
        }
        if (j == N_SIZE - i - 1) {
            cell.classList.add('diagonal1');
        }
        cell.identifier = identifier;
        cell.addEventListener("click", set);
        row.appendChild(cell);
        boxes.push(cell);
        identifier += identifier;
    }
}

document.getElementById("tictactoe").appendChild(board);
startNewGame();
}


//  משחק חדש
// new game
function startNewGame() {
score = {
    "X": 0,
    "O": 0
};
moves = 0;
turn = "X";
boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
});
}


//  בודק אם ניצחת או לא
// Checking to see if you won or not.
function win(clicked) {
// מקבל את הקלאס
// Gets the class.
let memberOf = clicked.className.split(/\s+/);
for (let i = 0; i < memberOf.length; i++) {
    let testClass = '.' + memberOf[i];
let items = contains('#tictactoe ' + testClass, turn);
    // .תנאי: מחזיר ניצחון
    // Condition: Returns victory.
    if (items.length == N_SIZE) {
        return true;
    }
}
return false;
}

function contains(selector, text) {
let elements = document.querySelectorAll(selector);
return [].filter.call(elements, function(element){
return RegExp(text).test(element.textContent);
});
}


//  .מגדיר לחיצה על הריבוע ומעדכן את התור 
// Defines a click on the square and updates the queue.
function set() {
if (this.innerHTML !== EMPTY) {
    return;
}
this.innerHTML = turn;
moves += 1;
score[turn] += this.identifier;
if (win(this)) {
    alert('Winner: Player ' + turn);
    startNewGame();
} else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
    startNewGame();
} else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById('turn').textContent = 'Player ' + turn;
}
}

init();
