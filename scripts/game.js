function resetGame() {
    activePlayer = 0;
    currentRoundCounter = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML =
    `You won, <span id="winner-name">PLAYER NAME</span>!`;
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;

            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex]
            gameBoardItemElement.textContent = "";
            gameBoardItemElement.classList.remove("selected");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    // 플레이어 설정을 안했다면 게임 시작 불가능
    if (players[0].name === "" || players[1].name === "") {
        alert("플레이어 설정을 완료해주세요.");
        return;
    }

    // 게임 설정 초기화
    resetGame();

    // 턴 표시
    activePlayerNameElement.textContent = players[activePlayer].name;
    // 게임 보드 표시
    gameAreaElement.style.display = "block";
}

function switchPlayer() {
    // activePlayer++;
    // activePlayer %= 2;

    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    const selectedFieldElement = event.target;

    // li 요소 사이의 빈 공간을 클릭하면 선택 불가능
    // 게임오버 상태면 선택 불가능
    if (selectedFieldElement.tagName !== "LI" || gameIsOver) {
        return;
    }

    // 2차원 배열
    // arr2D[row][col]
    const selectedRow = selectedFieldElement.dataset.row - 1;
    const selectedCol = selectedFieldElement.dataset.col - 1;

    // 이미 선택된 필드라면 선택 불가능
    if (gameData[selectedRow][selectedCol] !== 0) {
        alert("이미 선택됐습니다.");
        return;
    }

    // 어떤 필드를 선택했는지 2차원 배열에 저장
    gameData[selectedRow][selectedCol] = activePlayer + 1;

    // 선택한 필드를 표시
    selectedFieldElement.textContent = players[activePlayer].symbol;
    selectedFieldElement.classList.add("selected");

    // 게임오버 확인
    // winnerId 값이 0이면 아직 게임오버가 아닌 상태
    // winnerId 값이 1 또는 2면 플레이어 1 또는 플레이어 2가 승리한 상태(게임오버)
    // winnerId 값이 -1이면 무승부 상태(게임오버)
    const winnerId = checkForGameOver();

    // 게임오버 상태라면 게임 종료
    if (winnerId !== 0) {
        endGame(winnerId);
    }
    
    // 플레이어 턴 변경
    currentRoundCounter++;
    switchPlayer();
}

function checkForGameOver() {
    // 행의 값이 동일한 경우
    for (let i = 0; i < gameData.length; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] === gameData[i][2]
        ) {
            return gameData[i][0]; // 1 or 2
        }
    }
    // 열의 값이 동일한 경우
    for (let i = 0; i < gameData[0].length; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i]; // 1 or 2
        }
    }
    // 대각선의 값이 동일한 경우(1)
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0]; // 1 or 2
    }
    // 대각선의 값이 동일한 경우(2)
    if (gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[1][1] === gameData[2][0]
    ) {
        return gameData[0][2]; // 1 or 2
    }

    // 무승부인 경우
    if (currentRoundCounter === 9) {
        return -1;
    }

    return 0; // 아직 승패가 결정되지 않은 경우
}

function endGame(winnerId) {
    // 게임오버 상태 변경
    gameIsOver = true;

    // 게임오버 표시
    gameOverElement.style.display = "block";
    
    // 승패가 결정난 경우
    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;    
    }
    // 무승부인 경우
    else {
        gameOverElement.firstElementChild.textContent = "It's a draw!";
    }
}