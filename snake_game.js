const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

let totalFoodAte = 0;
let totalDistanceTravelled = 0;

//code for the game board pixels
const gameContainer = document.getElementById("gameContainer");
const createGameBoardPixels = () => {
    for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i){
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
};

const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

//code for the food
let currentFoodPosition = 0;
const createFood = () => {
    gameBoardPixels[currentFoodPosition].classList.remove("food");

    currentFoodPosition = Math.random();
    currentFoodPosition = Math.floor(currentFoodPosition * SQUARE_OF_GAME_PIXEL_COUNT);
    gameBoardPixels[currentFoodPosition].classList.add("food");
};

//code for the snake
const LEFT_DIR = 65;
const UP_DIR = 87;
const RIGHT_DIR = 68;
const DOWN_DIR = 83;

let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = newDirectionCode => {

    if(newDirectionCode == snakeCurrentDirection) return;
    if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !=RIGHT_DIR){
        snakeCurrentDirection = newDirectionCode;
    }else if (newDirectionCode == UP_DIR && snakeCurrentDirection != DOWN_DIR){
        snakeCurrentDirection = newDirectionCode;
    }else if (newDirectionCode == RIGHT_DIR && snakeCurrentDirection != LEFT_DIR){
        snakeCurrentDirection = newDirectionCode;
    }else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection != UP_DIR){
        snakeCurrentDirection = newDirectionCode;
    }
};

//code for Movement

let currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT/ 2;

let snakeLength = 1000;

const moveSnake = () => {
    switch (snakeCurrentDirection) {
      case LEFT_DIR:
        --currentSnakeHeadPosition;
        const isSnakeHeadAtLastGameBoardPixelTowardsLeft =
          currentSnakeHeadPosition % GAME_PIXEL_COUNT == GAME_PIXEL_COUNT - 1 ||
          currentSnakeHeadPosition < 0;
        if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
          currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
        }
        break;
      case UP_DIR:
        currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
        const isSnakeHeadAtLastGameBoardPixelTowardsUp =
          currentSnakeHeadPosition < 0;
        if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition + SQUARE_OF_GAME_PIXEL_COUNT;
        }
        break;
      case RIGHT_DIR:
        ++currentSnakeHeadPosition;
        const isSnakeHeadAtLastGameBoardPixelTowardsRight =
          currentSnakeHeadPosition % GAME_PIXEL_COUNT == 0;
        if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
          currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
        }
        break;
      case DOWN_DIR:
        currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
        const isSnakeHeadAtLastGameBoardPixelTowardsDown =
          currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1;
        if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition - SQUARE_OF_GAME_PIXEL_COUNT;
        }
        break;
      default:
        break;
    }
  
    let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

    // kill snake if it bites itself
    if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")){
        clearInterval(moveSnakeInterval);
        if (!alert(`You have eaten ${totalFoodAte} food by travelling ${totalDistanceTravelled} blocks.`))
        window.location.reload();
    }

    // If not killed add the snake body
    nextSnakeHeadPixel.classList.add("snakeBodyPixel");


    // This fuction removes the snake body from the end of the snake as it moves.
    // Also note that snakeLength is used as the timeout interval
    setTimeout(() =>{
        nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
    }, snakeLength);

    //Update total distance travelled
    totalDistanceTravelled++;
    //Update in UI
    document.getElementById("blocksTravelled").innerHTML = totalDistanceTravelled;

    //If snake bites the food
    if (currentSnakeHeadPosition == currentFoodPosition) {
        // Update total food eaten
        totalFoodAte++;
        //Update in UI
        document.getElementById("pointsEarned").innerHTML = totalFoodAte;
        //Increase snake length
        snakeLength = snakeLength + 100;
        //Create new food
        createFood();

    }
};

//code to start the game with the above logic
//create game board pixels
createGameBoardPixels();

//create initial food
createFood();

//move snake
// The variable, "moveSnakeInterval" is used to stop the snake on snake killed.
var moveSnakeInterval = setInterval(moveSnake, 80);

//call change direction function on keyboard key-down event
addEventListener("keydown", e => changeDirection(e.keyCode));

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");

leftButton.onclick = () => changeDirection(LEFT_DIR);
rightButton.onclick = () => changeDirection(RIGHT_DIR);
upButton.onclick = () => changeDirection(UP_DIR);
downButton.onclick = () => changeDirection(DOWN_DIR);


