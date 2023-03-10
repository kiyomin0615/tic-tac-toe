// 초기화 파일

let editedPlayer = 0;

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

const editPlayer1BtnElement = document.getElementById("edit-player-1");
const editPlayer2BtnElement = document.getElementById("edit-player-2");
const cancelOverlayBtnElement = document.getElementById("cancel-overlay");

editPlayer1BtnElement.addEventListener("click", openConfigurationOverlay);
editPlayer2BtnElement.addEventListener("click", openConfigurationOverlay);

cancelOverlayBtnElement.addEventListener("click", closeConfigurationOverlay);
backdropElement.addEventListener("click", closeConfigurationOverlay);

// form 요소 내부의 button(submit) 요소를 클릭하면
// form 요소에게 '제출 이벤트'가 발생한다
formElement.addEventListener("submit", savePlayerConfiguration);
