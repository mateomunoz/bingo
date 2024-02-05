/* 
    1 - tener un array con los números del 1 - 99
    2 - Pintar el tablero con todos los números
    3 - Sacar número aleatorio
    4 - Tacharía el número correspondiente
    5 - Generar cartones de jugador y de pc

*/

const bingoElement = document.getElementById('bingo');
const userBoardElement = document.getElementById('user-board');
const pcBoardElement = document.getElementById('pc-board');

const numbersToPlay = Array(99)
  .fill()
  .map((_, index) => index + 1);

const userNumbers = [];
const pcNumbers = [];
const boardSize = 15;
let intervalId;

const generateRandomNumber = max => {
  const randomNumber = Math.floor(Math.random() * max);
  return randomNumber;
};

const printBingo = () => {
  const fragment = document.createDocumentFragment();
  numbersToPlay.forEach(number => {
    const newNumber = document.createElement('span');
    newNumber.textContent = number;
    newNumber.dataset.number = number;
    newNumber.classList.add('bingo-number');
    fragment.append(newNumber);
  });

  bingoElement.append(fragment);
};

const printBoard = (board, element) => {
  //BOARD -> Array números del carton
  // ELEMENT -> div donde voy a pintar el tablero
  const fragment = document.createDocumentFragment();
  board.forEach(number => {
    const newNumber = document.createElement('span');
    newNumber.textContent = number;
    newNumber.classList.add('board-number');
    newNumber.dataset.number = number;
    fragment.append(newNumber);
  });

  element.append(fragment);
};

const generateBoard = boardToFill => {
  while (boardToFill.length < boardSize) {
    const randomNumber = generateRandomNumber(100);
    if (!boardToFill.includes(randomNumber)) {
      boardToFill.push(randomNumber);
    }
  }
};

const deleteNumberFromBingo = index => {
  numbersToPlay.splice(index, 1);
};

const checkWinner = () => {
  const userNumbersChecked = document.querySelectorAll(
    '.user-number-marked'
  ).length;
  const pcNumbersChecked =
    document.querySelectorAll('.pc-number-marked').length;

  if (userNumbersChecked === boardSize) {
    console.log('USER WIN');
    clearInterval(intervalId);
  }

  if (pcNumbersChecked === boardSize) {
    console.log('PC WIN');
    clearInterval(intervalId);
  }
};

const checkNumber = number => {
  const numberToMarked = document.querySelector(`[data-number="${number}"]`);
  numberToMarked.classList.add('bingo-marked');
  const userNumberToMarked = userBoardElement.querySelector(
    `[data-number="${number}"]`
  );
  if (userNumberToMarked) {
    userNumberToMarked.classList.add('user-number-marked');
  }

  const pcNumberToMarked = pcBoardElement.querySelector(
    `[data-number="${number}"]`
  );
  if (pcNumberToMarked) {
    pcNumberToMarked.classList.add('pc-number-marked');
  }
};

const extractNumberFromBingo = () => {
  checkWinner();
  const index = generateRandomNumber(numbersToPlay.length);
  const number = numbersToPlay[index];
  deleteNumberFromBingo(index);
  checkNumber(number);
  if (numbersToPlay.length <= 0) {
    clearInterval(intervalId);
  }
};

const startGame = () => {
  printBingo();
  generateBoard(userNumbers);
  printBoard(userNumbers, userBoardElement);

  generateBoard(pcNumbers);
  printBoard(pcNumbers, pcBoardElement);

  intervalId = setInterval(extractNumberFromBingo, 100);
};

startGame();
