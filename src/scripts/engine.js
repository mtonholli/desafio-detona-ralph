const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        playSound("gameover");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over. Sua pontuação foi: " + state.values.result);
        resetGame()
    }
}

function resetGame() {
    state.values.currentTime = 30;
    state.values.result = 0;

    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);

    addListenerHitBox();
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    if(audioName === "hit"){
        audio.volume = 0.02;
    }else audio.volume = 0.2;
    audio.play();
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        
        })
    })
}

function initialize(){
    addListenerHitBox();
}

initialize();