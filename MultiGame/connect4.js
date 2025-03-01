// Dustin Bachman
// 1 March 2025 
// Individual Assignment: Simple Multiplayer Game
// Functional Connect 4 game

// global variables
let board = [];
let currPlayer = 1;
const rows = 6;
const cols = 7;
let gameOver = false;

// Set up the javascript variable matrix and the DOM on page load
// PRE: Called on load 
// POST: Empty board has been created in JS and DOM
// (event 1)
window.onload = function blankBoard() {
    // set player 1 to currently playing
    let currentlyPlaying = document.getElementById("player1");
    currentlyPlaying.classList.add("currentlyPlaying");
    // go through num rows and num columns, create JS matrix filled with 0s, set up DOM with cells as well
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < cols; j++){
            // Put 0 in every spot in javascript board
            board[i][j] = 0;
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // store row and column for each DOM token 
            cell.setAttribute("row", i)
            cell.setAttribute("column", j)
            // Append created div to grid
            let grid = document.getElementById("grid");
            grid.appendChild(cell);
            //console.log(cell) // Testing
        }
    }
    //console.log(board) // Testing
}

// finds the lowest possible slot in column to put token in, updated JS matrix 
// parameters: col -- the column of the token being tried to drop 
// PRE: called by click event listener 
// POST: token has been dropped in correct column in lowest available row, JS and DOM have both been updated
function dropToken(col) {
    //console.log(board); // Testing

    // drop in right row 
    dropped = false;
    currRow = rows - 1; // start from bottom to find lowest available cell 
    // go through until dropped or edge is reached
    while ((dropped == false) && currRow >= 0 && 0 <= col <= cols - 1) {
        if (board[currRow][col] == 0) {
            //console.log("dropped in " + currRow + col)
            // update board and change current player
            //player 1
            if (currPlayer == 1) {
                // updated JS matrix element to correct value
                board[currRow][col] = 1; 
                // if no win
                if (!(updateBoard(currRow, col))) {
                    currPlayer = 2;
                    let p1 = document.getElementById("player1");
                    p1.classList.remove("currentlyPlaying");
                    let p2 = document.getElementById("player2");
                    p2.classList.add("currentlyPlaying");
                }
                
         }   
            // player 2
            else {
                // updated JS matrix element to correct value
                board[currRow][col] = 2;
                // if no win
                if (!(updateBoard(currRow, col))) {
                    currPlayer = 1;
                    let p1 = document.getElementById("player1");
                    p1.classList.add("currentlyPlaying");
                    let p2 = document.getElementById("player2");
                    p2.classList.remove("currentlyPlaying");
                }
            }
            dropped = true;
        }
        // update row to find next possible spot to drop
        currRow = currRow - 1;

        

    }

    // if there are no possible places to drop
    if ((dropped == false)) {
        console.log("Full");
        
    }
    return dropped;

}

// function to update the DOM board
// parameters: row = row of current token; col = column of current token
// PRE: Called each time a token is successfully dropped 
// POST: DOM board has been updated to match the JS matrix
function updateBoard(row, col) {
        //console.log(row, col)
        // get the correct cell to fill
        const cellToFill = document.querySelector('[column="'  + col + '"][row="' + row + '"]');
        //console.log(cellToFill); // Testing
        // change class of current token to correct color for current player
        if (currPlayer == 1) {
            cellToFill.classList.add("redToken");
        }
        else {
            cellToFill.classList.add("yellowToken");
        }
        // call checkWin and loop through if true is returned
        if (checkWin(row,col)) {
            let grid = document.getElementById("grid");
            // don't allow for any more clicks once win
            grid.removeEventListener('click', clickWatch);
            const p1 = document.getElementById('player1');
            const p2 = document.getElementById('player2');
            // if red won
            if (currPlayer == 1) {
                p1.classList.add("wonRed");
                p1.textContent = 'WINNER!'
                /*
                p1.classList.add("currentlyPlaying");
                p1.classList.remove("notPlaying");
                p2.classList.remove("currentlyPlaying");
                p2.classList.add("notPlaying");
                */
            }
            // if yellow won 
            else {
                p2.classList.add("wonYellow");
                p2.textContent = 'WINNER!'
            }
            return true;
            
        }

        return false;
}

// function to check if there is a win 
// parameters: row = row of current token; col = column of current token
// PRE: Called every time a token is dropped 
// POST: Returns true if there is a win, false if there is not
function checkWin(row, col) {
    // variables for searching
    count = 1;
    rSearch = true;
    lSearch = true;
    //console.log(cPtr);
    //console.log(currPlayer)

    // horizontal right search 
    cPtr = parseInt(col) + 1;
    while ((rSearch == true)) {
        //console.log(cPtr);
        if (!(0 <= cPtr <= cols - 1)) {
            rSearch = false;
        }

        if(board[row][cPtr] == currPlayer ) {
            count = count + 1;
        }
        else {
            rSearch = false;
        }
        cPtr = cPtr + 1;
    } 
    // horizontal left search
    cPtr = parseInt(col) - 1;
    while ((lSearch == true)) {
        //console.log(cPtr);
        if (!(0 <= cPtr <= cols - 1)) {
            lSearch = false;
        }

        if(board[row][cPtr] == currPlayer ) {
            count = count + 1;
        }
        else {
            lSearch = false;
        }
        cPtr = cPtr - 1;
    } 

    if (count >= 4) {
        return true;
    }

    // vertical search
    vPtr = parseInt(row) + 1;
    // reset count for new direction checking
    count = 1;
    vSearch = true;
    //console.log(board[vPtr][col])
    // vertical search
    while ((vSearch == true)) {
        // console.log("count " + count);
        // console.log("curr loc" + vPtr);
        if (vPtr >= rows) {
            vSearch = false;
            break;
        }

        if(board[vPtr][col] == currPlayer ) {
            count = count + 1;
        }
        else {
            vSearch = false;
        }
        vPtr = vPtr + 1;
    } 

    // check if win
    if (count >= 4) {
        return true;
    }

    // diagonal top left bottom right 
    // left search
    rPtr = parseInt(row) - 1; 
    cPtr = parseInt(col) - 1;
    // reset count for new direction checking
    count = 1;
    lSearch = true;
    rSearch = true;
    while (lSearch == true) {
        //console.log("cptr" + cPtr);
        //console.log("rptr" + rPtr);

        if (cPtr < 0 || cPtr >= cols || rPtr < 0 || rPtr >= rows) {
            lSearch = false;
            break;
        }
        if(board[rPtr][cPtr] == currPlayer ) {
            count = count + 1;
        }
        else {
            lSearch = false;
        }
        rPtr = rPtr - 1;
        cPtr = cPtr - 1;
    }

    // reset variables
    rPtr = parseInt(row) + 1; 
    cPtr = parseInt(col) + 1;
    // right side search
    while (rSearch == true) {

        if (cPtr < 0 || cPtr >= cols || rPtr < 0 || rPtr >= rows) {
            rSearch = false;
            break;
        }
        if(board[rPtr][cPtr] == currPlayer ) {
            count = count + 1;
        }
        else {
            rSearch = false;
        }
        rPtr = rPtr + 1;
        cPtr = cPtr + 1;
    }

    // check if win
    if (count >= 4) {
        return true;
    }

    // diagonal top right bottom left
    // left search
    rPtr = parseInt(row) - 1; 
    cPtr = parseInt(col) + 1;
    // reset count for new direction checking
    count = 1;
    lSearch = true;
    rSearch = true;
    while (lSearch == true) {
        //console.log("cptr" + cPtr);
        //console.log("rptr" + rPtr);

        if (cPtr < 0 || cPtr >= cols || rPtr < 0 || rPtr >= rows) {
            lSearch = false;
            break;
        }
        if(board[rPtr][cPtr] == currPlayer ) {
            count = count + 1;
        }
        else {
            lSearch = false;
        }
        rPtr = rPtr - 1;
        cPtr = cPtr + 1;
    }

    rPtr = parseInt(row) + 1; 
    cPtr = parseInt(col) - 1;

    // right side search
    while (rSearch == true) {

        if (cPtr < 0 || cPtr >= cols || rPtr < 0 || rPtr >= rows) {
            rSearch = false;
            break;
        }
        if(board[rPtr][cPtr] == currPlayer ) {
            count = count + 1;
        }
        else {
            rSearch = false;
        }
        rPtr = rPtr + 1;
        cPtr = cPtr - 1;
    }

    // check if win
    if (count >= 4) {
        gameOver = true;
        return true;
    }

    // no win found
    return false;

}


// function to get clicked column and call drop token
// PRE: Called when a click occurs 
// POST: Token has been dropped in the correct position if available
function clickWatch () {
    let clicked = event.target;
    if (clicked.tagName = "div") {
        //console.log(clicked.getAttribute("column"))
        //console.log(clicked.getAttribute("row"))
        //console.log(board[clicked.getAttribute("row"), clicked.getAttribute("column")]) // Testing
        dropToken(clicked.getAttribute("column"))
    }

}


// Event listener for clicks (event 2)
let grid = document.getElementById("grid");
grid.addEventListener('click', clickWatch);
    


