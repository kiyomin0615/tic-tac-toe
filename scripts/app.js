// 초기화 파일

// 게임 보드
// 인접 행렬(Adjacent Matrix) = 2차원 배열
const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

// 편집할 플레이어
let editedPlayer = 0; // 1 or 2
// 현재 턴인 플레이어
let activePlayer = 0; // 0 or 1
// 현재 라운드 카운터
let currentRoundCounter = 1; // 1 ~ 9
// 게임오버 상태
let gameIsOver = false;

const players = [
    {
        name: "",
        symbol: "X"
    },
    {
        name: "",
        symbol: "O"
    }
];

// configuration.js 파일의 openConfigurationOverlay 함수, closeConfigurationOverlay 함수에서도 사용할 수 있다
// 왜?
// openConfigurationOverlay 함수, closeConfigurationOverlay 함수는 콜백함수로 이벤트가 발생했을 때 실행되는 함수이기 때문에
const configurationOverlayElement = document.getElementById("configuration-overlay");
const backdropElement = document.getElementById("backdrop");

const formElement = document.querySelector("form");
const configurationErrorElement = document.getElementById("configuration-error");

const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const editPlayer1BtnElement = document.getElementById("edit-player-1");
const editPlayer2BtnElement = document.getElementById("edit-player-2");
const cancelOverlayBtnElement = document.getElementById("cancel-overlay");
const startNewGameBtnElement = document.getElementById("start-new-game");

// 1. li 요소 전부에 이벤트 추가하는 방식
// const gameFieldElements = document.querySelectorAll("ol#game-board li");
// 2. ol(=ul) 요소 하나에 이벤트 추가하는 방식
const gameBoardElement = document.getElementById("game-board");



editPlayer1BtnElement.addEventListener("click", openConfigurationOverlay);
editPlayer2BtnElement.addEventListener("click", openConfigurationOverlay);

cancelOverlayBtnElement.addEventListener("click", closeConfigurationOverlay);
backdropElement.addEventListener("click", closeConfigurationOverlay);

// form 요소 내부의 button(submit) 요소를 클릭하면
// form 요소에게 '제출 이벤트'가 발생한다
formElement.addEventListener("submit", savePlayerConfiguration);

startNewGameBtnElement.addEventListener("click", startNewGame);

// 1. li 요소 전부에 이벤트 추가하는 방식
// for (let gameFieldElement of gameFieldElements) {
//     gameFieldElement.addEventListener("click", selectGameField);
// }
// 2. ol(=ul) 요소 하나에 이벤트 추가하는 방식
gameBoardElement.addEventListener("click", selectGameField);