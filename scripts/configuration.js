// 브라우저에 의해서
// configuraion.js 파일에서 정의한 openConfigurationOverlay 함수를
// app.js 파일에서 사용할 수 있다

function openConfigurationOverlay(event) {
    // gevent.taret: #edit-player-# 요소
    // dataset: 요소 객체(DOM)에 data-key 속성으로 추가한 데이터(key-value) 집합
    // + 연산자를 통해서 문자열("1", "2")을 숫자(1, 2)로 변환
    editedPlayer = +event.target.dataset.playerid; // 1 or 2
    
    configurationOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
}

function closeConfigurationOverlay() {
    configurationOverlayElement.style.display = "none";
    backdropElement.style.display = "none";

    // .form-control 요소에 error 클래스 제거
    formElement.firstElementChild.classList.remove("error");

    // 에러 메세지 삭제
    configurationErrorElement.textContent = "";

    // 오버레이 닫을 때 input 요소(name="playername") 값 초기화
    formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfiguration(event) {
    // 제출 이벤트의 기본 기능을 막는다
    // 제출 이벤트가 발생하면 브라우저는 기본적으로 서버에 데이터를 제출한다
    // 결과적으로 페이지 리로드를 막는다
    event.preventDefault();

    // form 요소가 제출한 데이터 객체
    const formData = new FormData(event.target);
    // input 요소(name="playername")가 입력 받은 데이터
    // 입력 받은 플레이어 이름
    // string.trim(): 문자열에서 공백(white space)을 잘라내는(trim) 메소드
    // 문자열 컨텐츠 앞과 밖의 불필요한 공백만 잘라낸다
    const enteredPlayername = formData.get("playername").trim();

    // 공백 문자만 입력했다면 에러 발생
    // if (enteredPlayername === "") or if (ennteredPlayername === false)
    if (!enteredPlayername) {
        // .form-control 요소에 error 클래스 추가
        event.target.firstElementChild.classList.add("error");

        // 에러 메세지 추가
        configurationErrorElement.textContent = "Please Enter a Valid Name!";
        return;
    }

    const playerDataElement = document.getElementById(`player-${editedPlayer}-data`)

    // player name 표시
    playerDataElement.children[1].textContent = enteredPlayername;

    // player name 내부적으로 저장
    players[editedPlayer - 1].name = enteredPlayername;

    // 오버레이 닫기
    closeConfigurationOverlay();
}