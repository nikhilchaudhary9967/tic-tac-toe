const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


//need 
let currentPlayer;
let gameGrid;
const winningPosition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


//let create a function to initialise the game
newGameBtn.addEventListener("click", intiGame);
intiGame();

function intiGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
   
    // UI pe empty show karna
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvent = "all";
        //  initialize box width css property again
        box.classList = `box box${index + 1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player-${currentPlayer}`;

}



function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    // UI pe update 
    gameInfo.innerText = `Current Player-${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]] === gameGrid[position[1]] )&& (gameGrid[position[1]] === gameGrid[position[2]]) ){
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "0";
            }
            // diplay pointer events 
            boxes.forEach((box) => {
                box.style.pointerEvents= "none";
            })
            // how we know X/0 is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // it means we have winner 
    if (answer !== "") {
        gameInfo.innerText = `Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // let check if no winner 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++
        }
    });
    // board is filled game is tie 
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active")
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents= "none";
        // swap the turn 
        swapTurn();
        // check koi jeet to nhi gya 
        checkGameOver();
    }
};
boxes.forEach((box, index) => {  
    box.addEventListener("click", () => {
        handleClick(index);
    })
});





